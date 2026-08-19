const jsonwebtoken = require("jsonwebtoken");

const validate = (req, res, next) => {
    console.log(">>> VALIDATE");

    const token = req.headers.authorization?.split(" ")[1];

    console.log(">>> TOKEN:", token);

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

        console.log(">>> PAYLOAD:", payload);

        req.usuario = payload;

        next();

    } catch (err) {
        console.log(">>> ERRO JWT:", err);

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