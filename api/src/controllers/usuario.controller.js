const prisma = require("../data/prisma");
const jsonwebtoken = require("jsonwebtoken");

function validarUsuario(dados) {
    const {
        nome,
        email,
        senha,
        tipo_usuario,
        telefone,
        cidade
    } = dados;

    if (!nome || !email || !senha || !tipo_usuario || !telefone || !cidade) {
        return "Campos obrigatórios faltando";
    }

    if (!email.includes("@")) {
        return "Email inválido";
    }

    if (!["ADOTANTE", "CLINICA"].includes(tipo_usuario)) {
        return "Tipo de usuário inválido";
    }

    return null;
}

// LOGIN
const login = async (req, res) => {
    const email = req.body.email?.trim().toLowerCase();
    const senha = req.body.senha;

    if (!email || !senha) {
        return res.status(400).json({
            msg: "Todos os campos devem ser preenchidos"
        });
    }

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({
                msg: "Email ou senha incorretos."
            });
        }

        if (
            usuario.tipo_usuario === "CLINICA" &&
            (!usuario.crmv || !usuario.validado)
        ) {
            return res.status(403).json({
                msg: "A conta da clínica ainda não foi validada. Verifique o CRMV antes de entrar."
            });
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

        return res.status(500).json({
            msg: "Internal server error."
        });
    }
};

// CADASTRAR
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

    if (dados.tipo_usuario === "CLINICA" && !dados.crmv) {
        return res.status(400).json({
            msg: "Informe o CRMV."
        });
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

                residencia: dados.tipo_usuario === "ADOTANTE"
                    ? dados.residencia
                    : null,

                espaco: dados.tipo_usuario === "ADOTANTE"
                    ? dados.espaco
                    : null,

                experiencia: dados.tipo_usuario === "ADOTANTE"
                    ? dados.experiencia || null
                    : null,

                rotina: dados.tipo_usuario === "ADOTANTE"
                    ? dados.rotina
                    : null,

                crmv: dados.tipo_usuario === "CLINICA"
                    ? dados.crmv
                    : null,

                validado: false,
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

// LISTAR
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
                experiencia: true,
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

// BUSCAR
const buscar = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                msg: "ID inválido."
            });
        }

        const item = await prisma.usuario.findUnique({
            where: { id },
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
                experiencia: true,
                rotina: true,
                crmv: true,
                validado: true,
                fotoPerfil: true,
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

// ATUALIZAR
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
            experiencia,
            rotina,
            fotoPerfil
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
            experiencia,
            rotina,
            fotoPerfil
        };

        const item = await prisma.usuario.update({
            where: { id },
            data: dados,
            select: {
                id: true,
                nome: true,
                email: true,
                fotoPerfil: true,
                telefone: true,
                cidade: true,
                cep: true,
                endereco: true,
                bairro: true,
                numero: true,
                residencia: true,
                espaco: true,
                experiencia: true,
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

// ALTERAR SENHA
const alterarSenha = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                msg: "ID inválido."
            });
        }

        if (Number(req.usuario.id) !== id) {
            return res.status(403).json({
                msg: "Você não pode alterar a senha de outro usuário."
            });
        }

        const { senhaAtual, novaSenha } = req.body;

        if (!senhaAtual || !novaSenha || novaSenha.length < 8) {
            return res.status(400).json({
                msg: "Informe a senha atual e uma nova senha com pelo menos 8 caracteres."
            });
        }

        const usuario = await prisma.usuario.findUnique({
            where: { id }
        });

        if (!usuario || usuario.senha !== senhaAtual) {
            return res.status(400).json({
                msg: "A senha atual está incorreta."
            });
        }

        await prisma.usuario.update({
            where: { id },
            data: { senha: novaSenha }
        });

        return res.status(200).json({
            msg: "Senha alterada com sucesso."
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: "Erro ao alterar senha."
        });
    }
};

// LOGIN COM GOOGLE
const { OAuth2Client } = require("google-auth-library");

const loginGoogle = async (req, res) => {
    try {
        const { credential, tipo_usuario } = req.body;
        const clientId = process.env.GOOGLE_CLIENT_ID;

        if (!credential || !clientId) {
            return res.status(400).json({
                msg: "Login Google não configurado. Verifique o GOOGLE_CLIENT_ID."
            });
        }

        if (!["ADOTANTE", "CLINICA"].includes(tipo_usuario)) {
            return res.status(400).json({
                msg: "Tipo de usuário inválido."
            });
        }

        const clienteGoogle = new OAuth2Client(clientId);

        const ticket = await clienteGoogle.verifyIdToken({
            idToken: credential,
            audience: clientId
        });

        const google = ticket.getPayload();

        if (
            !google ||
            !google.sub ||
            !google.email ||
            google.email_verified !== true
        ) {
            return res.status(401).json({
                msg: "A conta Google não pôde ser confirmada."
            });
        }

        const email = google.email.trim().toLowerCase();

        let usuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (usuario) {
            if (usuario.tipo_usuario !== tipo_usuario) {
                return res.status(403).json({
                    msg: "Esta conta já está cadastrada em outra categoria. Entre pela área correta."
                });
            }

            if (
                usuario.tipo_usuario === "CLINICA" &&
                (!usuario.crmv?.trim() || !usuario.validado)
            ) {
                return res.status(403).json({
                    msg: "Sua conta veterinária ainda está pendente de validação do CRMV."
                });
            }

            if (usuario.googleId && usuario.googleId !== google.sub) {
                return res.status(409).json({
                    msg: "Este e-mail já está vinculado a outra conta Google."
                });
            }

            const atualizacao = {};

            if (!usuario.googleId) {
                atualizacao.googleId = google.sub;
            }

            if (!usuario.fotoPerfil && google.picture) {
                atualizacao.fotoPerfil = google.picture;
            }

            if (Object.keys(atualizacao).length > 0) {
                usuario = await prisma.usuario.update({
                    where: { id: usuario.id },
                    data: atualizacao
                });
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
                msg: "Login Google realizado com sucesso.",
                primeiroAcesso: false,
                token,
                usuario: usuarioSemSenha
            });
        }

        const cadastroToken = jsonwebtoken.sign(
            {
                finalidade: "COMPLETAR_CADASTRO_GOOGLE",
                googleSub: google.sub,
                email,
                nome: google.name || email.split("@")[0],
                fotoPerfil: google.picture || null,
                tipo_usuario
            },
            process.env.SECRET_JWT,
            { expiresIn: "15min" }
        );

        return res.status(200).json({
            msg: "Complete seus dados para finalizar o cadastro.",
            primeiroAcesso: true,
            cadastroToken,
            dadosGoogle: {
                nome: google.name || "",
                email,
                fotoPerfil: google.picture || null
            }
        });

    } catch (error) {
        console.error("Erro no login Google:", error);

        return res.status(401).json({
            msg: "Não foi possível validar a conta Google."
        });
    }
};

// CONCLUIR CADASTRO GOOGLE
const completarCadastroGoogle = async (req, res) => {
    try {
        const autorizacao = req.headers.authorization;
        const [tipo, token] = autorizacao?.split(" ") || [];

        if (tipo !== "Bearer" || !token) {
            return res.status(401).json({
                msg: "Token de cadastro não informado."
            });
        }

        const dadosGoogle = jsonwebtoken.verify(
            token,
            process.env.SECRET_JWT
        );

        if (dadosGoogle.finalidade !== "COMPLETAR_CADASTRO_GOOGLE") {
            return res.status(401).json({
                msg: "Token de cadastro inválido."
            });
        }

        const {
            telefone,
            cidade,
            residencia,
            espaco,
            experiencia,
            rotina,
            crmv
        } = req.body;

        const tipoUsuario = dadosGoogle.tipo_usuario;

        if (!telefone?.trim() || !cidade?.trim()) {
            return res.status(400).json({
                msg: "Informe telefone e cidade."
            });
        }

        if (
            tipoUsuario === "ADOTANTE" &&
            (!residencia?.trim() || !espaco?.trim() || !rotina?.trim())
        ) {
            return res.status(400).json({
                msg: "Preencha os dados necessários do adotante."
            });
        }

        if (tipoUsuario === "CLINICA" && !crmv?.trim()) {
            return res.status(400).json({
                msg: "Informe o CRMV."
            });
        }

        const existente = await prisma.usuario.findUnique({
            where: { email: dadosGoogle.email }
        });

        if (existente) {
            return res.status(409).json({
                msg: "Este e-mail já possui cadastro. Entre pela tela de login."
            });
        }

        const usuario = await prisma.usuario.create({
            data: {
                nome: dadosGoogle.nome,
                email: dadosGoogle.email,
                senha: `google-${require("node:crypto").randomUUID()}`,
                googleId: dadosGoogle.googleSub,
                fotoPerfil: dadosGoogle.fotoPerfil,
                telefone: telefone.trim(),
                cidade: cidade.trim(),

                residencia: tipoUsuario === "ADOTANTE"
                    ? residencia.trim()
                    : null,

                espaco: tipoUsuario === "ADOTANTE"
                    ? espaco.trim()
                    : null,

                experiencia: tipoUsuario === "ADOTANTE"
                    ? (experiencia?.trim() || null)
                    : null,

                rotina: tipoUsuario === "ADOTANTE"
                    ? rotina.trim()
                    : null,

                crmv: tipoUsuario === "CLINICA"
                    ? crmv.trim()
                    : null,

                tipo_usuario: tipoUsuario,

                // Clínica nunca é aprovada automaticamente.
                validado: tipoUsuario === "ADOTANTE"
            }
        });

        const tokenAcesso = jsonwebtoken.sign(
            {
                id: usuario.id,
                email: usuario.email,
                tipo_usuario: usuario.tipo_usuario
            },
            process.env.SECRET_JWT,
            { expiresIn: "60min" }
        );

        const { senha: _, ...usuarioSemSenha } = usuario;

        return res.status(201).json({
            msg: tipoUsuario === "CLINICA"
                ? "Cadastro concluído. Sua conta está aguardando validação do CRMV."
                : "Cadastro concluído com sucesso.",
            token: tokenAcesso,
            usuario: usuarioSemSenha
        });

    } catch (error) {
        console.error("Erro ao concluir cadastro Google:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                msg: "O tempo para concluir o cadastro expirou. Entre com Google novamente."
            });
        }

        if (error.code === "P2002") {
            return res.status(409).json({
                msg: "Este e-mail ou esta conta Google já está cadastrado."
            });
        }

        return res.status(500).json({
            msg: "Erro ao concluir cadastro Google."
        });
    }
};

// EXCLUIR
const excluir = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                msg: "ID inválido."
            });
        }

        if (req.usuario.tipo_usuario !== "CLINICA") {
            return res.status(403).json({
                msg: "Apenas a clínica pode excluir usuários."
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
    alterarSenha,
    loginGoogle,
    completarCadastroGoogle,
    excluir
};