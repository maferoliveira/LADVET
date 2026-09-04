const prisma = require("../data/prisma");
const jsonwebtoken = require("jsonwebtoken");

function validarUsuario(dados) {
    const { nome, email, senha, tipo_usuario, telefone, cidade } = dados;

    if (!nome || !email || !senha || !tipo_usuario || !telefone || !cidade) {
        return "Campos obrigatórios faltando";
    }

    if (!email.includes("@")) return "Email inválido";

    if (!["ADOTANTE", "CLINICA"].includes(tipo_usuario)) {
        return "Tipo de usuário inválido";
    }

    return null;
}

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ msg: "Todos os campos devem ser preenchidos" });
    }

    try {
        const usuario = await prisma.usuario.findFirst({
            where: { email, senha }
        });

        if (!usuario) {
            return res.status(401).json({ msg: "Email ou senha incorretos." });
        }

        const token = jsonwebtoken.sign(
            {
                id: usuario.id,
                email: usuario.email,
                tipo_usuario: usuario.tipo_usuario
            },
            process.env.SECRET_JWT,
            { expiresIn: "60min" }
        );
        const { senha: _, ...usuarioSemSenha } = usuario;

        return res.status(200).json({
            msg: "Login realizado com sucesso",
            token,
            usuario: usuarioSemSenha
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error." });
    }
};

const cadastrar = async (req, res) => {
    const dados = { ...req.body };

    const erro = validarUsuario(dados);
    if (erro) {
        return res.status(400).json({ msg: erro });
    }

    if (dados.tipo_usuario === "ADOTANTE") {
        if (!dados.residencia || !dados.espaco || !dados.rotina) {
            return res.status(400).json({
                msg: "Preencha todos os dados necessários do adotante."
            });
        }
    }

    if (dados.tipo_usuario === "CLINICA") {
        if (!dados.crmv) {
            return res.status(400).json({
                msg: "Informe o CRMV."
            });
        }
    }

    try {
        const novoUsuario = await prisma.usuario.create({
            data: {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
                telefone: dados.telefone,
                cidade: dados.cidade,

                cep: dados.cep || null,
                endereco: dados.endereco || null,
                bairro: dados.bairro || null,
                numero: dados.numero || null,

                // Apenas adotante
                residencia: dados.tipo_usuario === "ADOTANTE"
                    ? dados.residencia
                    : null,

                espaco: dados.tipo_usuario === "ADOTANTE"
                    ? dados.espaco
                    : null,

                rotina: dados.tipo_usuario === "ADOTANTE"
                    ? dados.rotina
                    : null,

                // Apenas clínica
                crmv: dados.tipo_usuario === "CLINICA"
                    ? dados.crmv
                    : null,

                // Para testes
                validado: dados.tipo_usuario === "CLINICA"
                    ? true
                    : false,

                tipo_usuario: dados.tipo_usuario
            }
        });
        const { senha: _, ...usuarioSemSenha } = novoUsuario;

        return res.status(201).json(usuarioSemSenha);

    } catch (error) {
        console.error(error);

        if (error.code === "P2002") {
            return res.status(409).json({
                msg: "Este email já está cadastrado."
            });
        }

        return res.status(500).json({
            msg: "Internal server error."
        });
    }
};

const listar = async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                cidade: true,
                cep: true,
                endereco: true,
                bairro: true,
                numero: true,
                residencia: true,
                espaco: true,
                rotina: true,
                crmv: true,
                validado: true,
                tipo_usuario: true
            }
        });

        return res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Erro ao listar usuários."
        });
    }
};

const buscar = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                msg: "ID inválido."
            });
        }

        const item = await prisma.usuario.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                cidade: true,
                cep: true,
                endereco: true,
                bairro: true,
                numero: true,
                residencia: true,
                espaco: true,
                rotina: true,
                crmv: true,
                validado: true,
                tipo_usuario: true
            }
        });

        if (!item) {
            return res.status(404).json({
                msg: "Usuário não encontrado."
            });
        }

        return res.status(200).json(item);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: "Erro ao buscar usuário."
        });
    }
};

const atualizar = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                msg: "ID inválido."
            });
        }

        if (Number(req.usuario.id) !== id) {
            return res.status(403).json({
                msg: "Você não pode alterar outro usuário."
            });
        }

        const {
            nome,
            email,
            telefone,
            cidade,
            cep,
            endereco,
            bairro,
            numero,
            residencia,
            espaco,
            rotina
        } = req.body;

        const dados = {
            nome,
            email,
            telefone,
            cidade,
            cep,
            endereco,
            bairro,
            numero,
            residencia,
            espaco,
            rotina
        };

        const item = await prisma.usuario.update({
            where: { id },
            data: dados,
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                cidade: true,
                cep: true,
                endereco: true,
                bairro: true,
                numero: true,
                residencia: true,
                espaco: true,
                rotina: true,
                crmv: true,
                validado: true,
                tipo_usuario: true
            }
        });

        return res.status(200).json(item);

    } catch (error) {
        console.error(error);

        if (error.code === "P2002") {
            return res.status(409).json({
                msg: "Este email já está cadastrado."
            });
        }

        return res.status(500).json({
            msg: "Erro ao atualizar usuário."
        });
    }
};

const excluir = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                msg: "ID inválido."
            });
        }

        if (Number(req.usuario.id) !== id) {
            return res.status(403).json({
                msg: "Você não pode excluir outro usuário."
            });
        }

        const item = await prisma.usuario.delete({
            where: { id }
        });

        const { senha: _, ...usuarioSemSenha } = item;

        return res.status(200).json(usuarioSemSenha);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: "Erro ao excluir usuário."
        });
    }
};

module.exports = {
    validarUsuario,
    login,
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};
