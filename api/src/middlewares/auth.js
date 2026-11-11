
const jsonwebtoken = require("jsonwebtoken");
const prisma = require("../data/prisma");

// Verifica se o usuário está autenticado
const validate = (req, res, next) => {
    const autorizacao = req.headers.authorization;
    const [tipo, token] = autorizacao?.split(" ") || [];

    if (tipo !== "Bearer" || !token) {
        return res.status(401).json({
            msg: "Acesso negado. Token não informado ou inválido."
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


// Verifica o tipo e a aprovação do usuário
const permitirTipo = (tipoPermitido) => {
    return async (req, res, next) => {
        try {
            // Busca os dados atuais do usuário no banco
            const usuario = await prisma.usuario.findUnique({
                where: {
                    id: Number(req.usuario.id)
                },
                select: {
                    id: true,
                    tipo_usuario: true,
                    crmv: true,
                    validado: true
                }
            });

            if (!usuario) {
                return res.status(401).json({
                    msg: "Usuário não encontrado."
                });
            }

            // Confere se o tipo de usuário corresponde à rota
            if (usuario.tipo_usuario !== tipoPermitido) {
                return res.status(403).json({
                    msg: `Acesso permitido apenas para ${tipoPermitido}.`
                });
            }

            // Clínicas precisam ter CRMV e aprovação
            if (
                usuario.tipo_usuario === "CLINICA" &&
                (!usuario.crmv?.trim() || !usuario.validado)
            ) {
                return res.status(403).json({
                    msg: "Sua conta veterinária ainda está pendente de validação do CRMV."
                });
            }

            // Permite continuar se todas as verificações passaram
            req.usuario.tipo_usuario = usuario.tipo_usuario;

            next();

        } catch (err) {
            console.error("Erro ao verificar permissão:", err);

            return res.status(500).json({
                msg: "Erro ao verificar as permissões do usuário."
            });
        }
    };
};


module.exports = {
    validate,
    permitirTipo
};
