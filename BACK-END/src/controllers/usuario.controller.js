const { tipo_usuario } = require("@prisma/client");
const prisma = require("../data/prisma");
const { validaCadastroVeterinario } = require("../services/usuario.services");
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

function validarUsuario(dados) {
    const { nome, email, senha, tipo_usuario } = dados;
    if (!nome || !email || !senha || !tipo_usuario) {
        return "Campos obrigatórios faltando"
    }
    if (!email.includes("@")) {
        return "Email inválido"
    }

    const usuariosvalidos = ["ADOTANTE", "CLINICA"];
    if (!usuariosvalidos.includes(tipo_usuario)) {
        return "Tipo de usuário inválido"
    }
}
const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ msg: "Todos os campos devem ser preenchidos" });
    }
    try {
        const senhaHash = crypto.createHash('md5').update(senha).digest('hex');
        console.log(email, senhaHash)

        const usuario = await prisma.usuario.findUnique({
            where: { email }
        })
        if (!usuario || usuario.senha !== senhaHash) {
            return res.status(401).json({ erro: "Email ou senha inválidos" })
        }
        const token = jsonwebtoken.sign(
            {
                id: usuario.usuarioID,
                nome: usuario.nome,
                tipo_usuario: usuario.tipo_usuario
            },
            process.env.SECRET_JWT,
            { expiresIn: '60min' }
        )

        return res.status(200).json({ msg: "Login realizado com sucesso", token })

    } catch (error) {
        console.error("Erro na tentativa de login:", error)
        res.status(500).json({ msg: "Internal server error." })
    }
}

const cadastrar = async (req, res) => {
    const { nome, email, senha, telefone, cidade, tipo_usuario, crmv } = req.body;
    try {
        const senhaHash = crypto.createHash('md5').update(senha).digest('hex');

        if(tipo_usuario === "CLINICA") {
            validaCadastroVeterinario(req.body);
        }

        const novousuario = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: senhaHash,
                telefone: telefone,
                cidade: cidade,
                tipo_usuario: tipo_usuario,
                crmv: crmv
            }
        })
        return res.status(200).json(novousuario)

    } catch (error) {
        console.error("Erro na tentativa de cadastro:", error)
        res.status(500).json({ msg: "Internal server error." })
    }
};

const listar = async (req, res) => {
    const lista = await prisma.usuario.findMany();

    res.json(lista).status(200)
};

const buscar = async (req, res) => {
    const { id } = req.params;

    const item = await prisma.usuario.findUnique({
        where: { id: Number(id) }
    });

    res.json(item).status(200)
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;

    const item = await prisma.usuario.update({
        where: { id: Number(id) },
        data: dados
    });

    res.json(item).status(200)
};

const excluir = async (req, res) => {
    const { id } = req.params;

    const item = await prisma.usuario.delete({
        where: { id: Number(id) }
    });

    res.json(item).status(200)
};

module.exports = {
    validarUsuario,
    login,
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}
