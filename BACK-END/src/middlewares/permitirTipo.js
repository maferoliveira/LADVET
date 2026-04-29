const permitirTipo = (tipoPermitido) => {
    return (req, res, next)=>{
        if(req.usuario.tipo_usuario !== tipoPermitido){
            return res.status(403).json({msg: `Acesso permitido apenas para ${tipoPermitido}`})
        }
        next();
    }
}

module.exports = permitirTipo;