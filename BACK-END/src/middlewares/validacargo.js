const validaveterinario = (req, res, next)=>{
    const usuario = req.headers['user'];
    if(usuario.tipo_usuario==="CLINICA"){
        next();
    }else{
        res.status(401).json({msg:"Usuário sem permissão"}).end()
    }
}

module.exports = validaveterinario;