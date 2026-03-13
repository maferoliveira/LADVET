const prisma = require("../data/prisma")

function validarUsuario(dados){
    const {nome, email, senha, tipo_usuario} = dados;
    if(!nome || !email || !senha || !tipo_usuario){
        return "Campos obrigatórios faltando"
    }
    if(!email.includes("@")){
        return "Email inválido"
    }

    const usuariosvalidos = ["ADOTANTE", "CLINICA"];
    if(!usuariosvalidos.includes(tipo_usuario)){
        return "Tipo de usuário inválido"
    }
}

const novousuario = async (req, res) =>{
    const erro = validarUsuario(req.body);
    if(erro){
        return res.status(400).json({erro})
    }

    const usuario = await prisma.usuario.create({
        data: req.body
    }); return res.status(201).json(usuario);
}

const loginusuario = async (req, res)=>{
    const {email, senha} = req.body;
    const usuario = await prisma.usuario.findUnique({
        where: {email}
    });
    if(!usuario || usuario.senha !== senha){
        return res.status(401).json({erro: "Email ou senha inválidos"})
    }
    res.status(200).json({msg: "Login realizado", usuario})
}

const listarusuarios = async (req, res)=>{
    const listar = await prisma.usuario.findMany();
    res.status(201).json({listar})
}

const buscarusuario = async (req, res)=>{
    const {id} = req.params;
    const usuario = await prisma.usuario.findUnique({
        where: {id},
        include:{
            usuario: true
        }
    }); res.status(201).json(usuario)
}

const deletarusuario = async (req, res)=>{
    const {id} = req.params;
    const usuario = await prisma.usuario.delete({
        where: {id}
    }); res.status(201).json(usuario)
}

const atualizarusuario = async(req, res)=>{
    const {id} = req.params;
    const usuario = await prisma.usuario.update({
        where: {id: Number(id)},
        data: req.body
    }); res.status(201).json(usuario)
}

module.exports = {
    novousuario,
    loginusuario,
    listarusuarios,
    buscarusuario,
    deletarusuario,
    atualizarusuario
}