const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const {
        animalID,
        moradia,
        temQuintal,
        experiencia,
        tempoDisponivel
    } = req.body;

    // Apenas adotantes podem solicitar adoção
    if (req.usuario.tipo_usuario !== "ADOTANTE") {
        return res.status(403).json({
            msg: "Apenas adotantes podem solicitar adoção."
        });
    }

    if (!animalID || !moradia || temQuintal === undefined || !tempoDisponivel) {
        return res.status(400).json({
            msg: "Animal, moradia, quintal e tempo disponível são obrigatórios."
        });
    }

    try {
        const animal = await prisma.animal.findUnique({
            where: {
                id: Number(animalID)
            }
        });

        if (!animal) {
            return res.status(404).json({
                msg: "Animal não encontrado."
            });
        }

        // Só pode solicitar animal disponível
        if (animal.status !== "DISPONIVEL") {
            return res.status(400).json({
                msg: "Este animal não está disponível para adoção."
            });
        }

        const item = await prisma.adocao.create({
            data: {
                animalID: Number(animalID),
                adotanteID: Number(req.usuario.id),
                moradia,
                temQuintal: Boolean(temQuintal),
                experiencia: experiencia || null,
                tempoDisponivel,
                status: "PENDENTE"
            }
        });

        return res.status(201).json(item);

    } catch (error) {
        console.error("Erro ao salvar adoção:", error);

        return res.status(500).json({
            msg: "Erro ao salvar a adoção."
        });
    }
};


// Lista todas as adoções - apenas clínica
const listar = async (req, res) => {

    if (req.usuario.tipo_usuario !== "CLINICA") {
        return res.status(403).json({
            msg: "Apenas a clínica pode listar todas as adoções."
        });
    }

    try {
        const lista = await prisma.adocao.findMany({
            include: {
                animal: true,
                adotante: true
            },
            orderBy: {
                id: "desc"
            }
        });

        return res.status(200).json(lista);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: "Erro ao listar adoções."
        });
    }
};


// Lista as solicitações do adotante logado
const listarMinhas = async (req, res) => {

    if (req.usuario.tipo_usuario !== "ADOTANTE") {
        return res.status(403).json({
            msg: "Apenas adotantes possuem solicitações de adoção."
        });
    }

    try {
        const lista = await prisma.adocao.findMany({
            where: {
                adotanteID: Number(req.usuario.id)
            },
            include: {
                animal: true
            },
            orderBy: {
                id: "desc"
            }
        });

        return res.status(200).json(lista);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: "Erro ao listar suas solicitações."
        });
    }
};


const buscar = async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            msg: "ID inválido."
        });
    }

    try {
        const item = await prisma.adocao.findUnique({
            where: { id },
            include: {
                animal: true,
                adotante: true
            }
        });

        if (!item) {
            return res.status(404).json({
                msg: "Registro de adoção não encontrado."
            });
        }

        // Adotante só pode ver a própria solicitação
        if (
            req.usuario.tipo_usuario === "ADOTANTE" &&
            item.adotanteID !== req.usuario.id
        ) {
            return res.status(403).json({
                msg: "Você não pode acessar esta solicitação."
            });
        }

        return res.status(200).json(item);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: "Erro ao buscar adoção."
        });
    }
};


// Apenas a clínica aprova ou recusa
const atualizar = async (req, res) => {
    const id = Number(req.params.id);
    const status = req.body.status;

    if (req.usuario.tipo_usuario !== "CLINICA") {
        return res.status(403).json({
            msg: "Apenas a clínica pode atualizar adoções."
        });
    }

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            msg: "ID inválido."
        });
    }

    if (!["APROVADA", "RECUSADA"].includes(status)) {
        return res.status(400).json({
            msg: "Status inválido. Use APROVADA ou RECUSADA."
        });
    }

    try {
        const adocao = await prisma.adocao.findUnique({
            where: { id }
        });

        if (!adocao) {
            return res.status(404).json({
                msg: "Registro de adoção não encontrado."
            });
        }

        // Não altera uma adoção já decidida
        if (adocao.status !== "PENDENTE") {
            return res.status(400).json({
                msg: "Esta solicitação já foi analisada."
            });
        }

        const item = await prisma.adocao.update({
            where: { id },
            data: { status }
        });

        // Se aprovada, o animal fica adotado
        if (status === "APROVADA") {
            await prisma.animal.update({
                where: {
                    id: item.animalID
                },
                data: {
                    status: "ADOTADO"
                }
            });
        }

        return res.status(200).json(item);

    } catch (error) {
        console.error("Erro ao atualizar adoção:", error);

        return res.status(500).json({
            msg: "Erro ao atualizar adoção."
        });
    }
};


// Apenas a clínica pode excluir
const excluir = async (req, res) => {
    const id = Number(req.params.id);

    if (req.usuario.tipo_usuario !== "CLINICA") {
        return res.status(403).json({
            msg: "Apenas a clínica pode excluir adoções."
        });
    }

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            msg: "ID inválido."
        });
    }

    try {
        const adocao = await prisma.adocao.findUnique({
            where: { id }
        });

        if (!adocao) {
            return res.status(404).json({
                msg: "Registro de adoção não encontrado."
            });
        }

        await prisma.adocao.delete({
            where: { id }
        });

        return res.status(200).json({
            msg: "Adoção excluída com sucesso."
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: "Erro ao excluir adoção."
        });
    }
};


module.exports = {
    cadastrar,
    listar,
    listarMinhas,
    buscar,
    atualizar,
    excluir
};