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
        return res.status(400).json({
            msg: "Todos os campos devem ser preenchidos"
        });
    }

    try {
        const usuario = await prisma.usuario.findFirst({
            where: {
                email,
                senha
            }
        });

        if (!usuario) {
            return res.status(404).json({
                msg: "Usuário não encontrado."
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

        return res.status(200).json({
            msg: "Login realizado com sucesso",
            token
        });

    } catch (error) {
        console.error("Erro na tentativa de login:", error);
        return res.status(500).json({
            msg: "Internal server error."
        });
    }
};

const cadastrar = async (req, res) => {
    const dados = req.body;
    try {
        const novousuario = await prisma.usuario.create({
            data: dados
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
