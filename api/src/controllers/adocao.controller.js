const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const {
        animalID,
        moradia,
        temQuintal,
        experiencia,
        tempoDisponivel
    } = req.body;

    if (!animalID || !moradia || temQuintal === undefined || !tempoDisponivel) {
        return res.status(400).json({
            msg: "Animal, moradia, quintal e tempo disponível são obrigatórios."
        });
    }

    try {
        const animal = await prisma.animal.findUnique({
            where: { id: Number(animalID) }
        });

        if (!animal) return res.status(404).json({ msg: "Animal não encontrado." });

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
        return res.status(500).json({ msg: "Erro ao salvar a adoção." });
    }
};

const listar = async (req, res) => {
    try {
        const lista = await prisma.adocao.findMany({
            include: {
                animal: true,
                adotante: true
            },
            orderBy: { id: "desc" }
        });
        return res.status(200).json(lista);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Erro ao listar adoções." });
    }
};

const listarMinhas = async (req, res) => {
    try {
        const lista = await prisma.adocao.findMany({
            where: { adotanteID: Number(req.usuario.id) },
            include: { animal: true },
            orderBy: { id: "desc" }
        });
        return res.status(200).json(lista);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Erro ao listar suas solicitações." });
    }
};

const buscar = async (req, res) => {
    try {
        const item = await prisma.adocao.findUnique({
            where: { id: Number(req.params.id) },
            include: { animal: true, adotante: true }
        });

        if (!item) return res.status(404).json({ msg: "Registro de adoção não encontrado." });
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({ msg: "Erro ao buscar adoção." });
    }
};

const atualizar = async (req, res) => {
    const status = req.body.status;

    if (!["PENDENTE", "APROVADA", "RECUSADA"].includes(status)) {
        return res.status(400).json({ msg: "Status inválido." });
    }

    try {
        const item = await prisma.adocao.update({
            where: { id: Number(req.params.id) },
            data: { status }
        });

        if (status === "APROVADA") {
            await prisma.animal.update({
                where: { id: item.animalID },
                data: { status: "ADOTADO" }
            });
        }

        if (status === "RECUSADA") {
            await prisma.animal.update({
                where: { id: item.animalID },
                data: { status: "DISPONIVEL" }
            });
        }

        return res.status(200).json(item);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Erro ao atualizar adoção." });
    }
};

const excluir = async (req, res) => {
    try {
        await prisma.adocao.delete({
            where: { id: Number(req.params.id) }
        });
        return res.status(200).json({ msg: "Adoção excluída com sucesso." });
    } catch (error) {
        return res.status(500).json({ msg: "Erro ao excluir adoção." });
    }
};

module.exports = { cadastrar, listar, listarMinhas, buscar, atualizar, excluir };
