const jsonwebtoken = require("jsonwebtoken");

const validate = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];


    if (!token) {
        return res.status(401).json({
            msg: "Acesso negado. Token não informado."
        });
    }

    try {
        const payload = jsonwebtoken.verify(
            token,
            process.env.SECRET_JWT
        );


        req.usuario = payload;

        next();

    } catch (err) {

        return res.status(401).json({
            msg: "Token inválido ou expirado."
        });
    }
};


const permitirTipo = (tipoPermitido) => {
    return (req, res, next) => {
        if (req.usuario.tipo_usuario !== tipoPermitido) {
            return res.status(403).json({
                msg: `Acesso permitido apenas para ${tipoPermitido}.`
            });
        }

        next();
    };
};


module.exports = {
    validate,
    permitirTipo
};