const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const { nome, dataAplicacao, proximaDose, veterinario, lote, animalID } = req.body;

    if (!nome || !dataAplicacao || !veterinario || !lote || !animalID) {
        return res.status(400).json({ msg: "Campos obrigatórios faltando" });
    }

    try {
        const item = await prisma.vacina.create({
            data: {
                nome,
                dataAplicacao: new Date(dataAplicacao),
                proximaDose: proximaDose ? new Date(proximaDose) : null,
                veterinario,
                lote,
                animalID: Number(animalID)
            }
        });

        res.status(201).json(item);
    } catch (error) {
        console.error("Erro na tentativa de cadastro de vacina:", error);
        res.status(500).json({ msg: "Internal server error." });
    }
};

// RF13 - histórico de vacinas de um animal específico
const listarPorAnimal = async (req, res) => {
    const { animalID } = req.params;

    const lista = await prisma.vacina.findMany({
        where: { animalID: Number(animalID) },
        orderBy: { dataAplicacao: "desc" }
    });

    res.status(200).json(lista);
};

const buscar = async (req, res) => {
    const { id } = req.params;

    const item = await prisma.vacina.findUnique({
        where: { id: Number(id) }
    });

    if (!item) return res.status(404).json({ msg: "Vacina não encontrada." });

    res.status(200).json(item);
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const { nome, dataAplicacao, proximaDose, veterinario, lote } = req.body;

    try {
        const item = await prisma.vacina.update({
            where: { id: Number(id) },
            data: {
                ...(nome && { nome }),
                ...(dataAplicacao && { dataAplicacao: new Date(dataAplicacao) }),
                ...(proximaDose && { proximaDose: new Date(proximaDose) }),
                ...(veterinario && { veterinario }),
                ...(lote && { lote })
            }
        });

        res.status(200).json(item);
    } catch (error) {
        console.error("Erro na tentativa de atualizar vacina:", error);
        res.status(500).json({ msg: "Internal server error." });
    }
};

const excluir = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await prisma.vacina.delete({
            where: { id: Number(id) }
        });

        res.status(200).json(item);
    } catch (error) {
        console.error("Erro na tentativa de excluir vacina:", error);
        res.status(500).json({ msg: "Internal server error." });
    }
};

module.exports = {
    cadastrar,
    listarPorAnimal,
    buscar,
    atualizar,
    excluir
}
