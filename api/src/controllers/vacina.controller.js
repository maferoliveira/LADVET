const prisma = require("../data/prisma");

// Função auxiliar para validar datas
const eDataValida = (dataString) => {
    const data = new Date(dataString);
    return !isNaN(data.getTime());
};

const cadastrar = async (req, res) => {
    const { nome, dataAplicacao, proximaDose, veterinario, lote, animalID } = req.body;

    if (!nome || !dataAplicacao || !veterinario || !lote || !animalID) {
        return res.status(400).json({ msg: "Campos obrigatórios faltando" });
    }

    if (!eDataValida(dataAplicacao) || (proximaDose && !eDataValida(proximaDose))) {
        return res.status(400).json({ msg: "Formato de data inválido." });
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

        return res.status(201).json(item);
    } catch (error) {
        console.error("Erro na tentativa de cadastro de vacina:", error);
        
        if (error.code === 'P2003') {
            return res.status(404).json({ msg: "Animal informado não existe." });
        }

        return res.status(500).json({ msg: "Internal server error." });
    }
};

const listarPorAnimal = async (req, res) => {
    const { animalID } = req.params;

    try {
        const lista = await prisma.vacina.findMany({
            where: { animalID: Number(animalID) },
            orderBy: { dataAplicacao: "desc" }
        });

        return res.status(200).json(lista);
    } catch (error) {
        console.error("Erro ao listar vacinas por animal:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
};

const buscar = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await prisma.vacina.findUnique({
            where: { id: Number(id) }
        });

        if (!item) return res.status(404).json({ msg: "Vacina não encontrada." });

        return res.status(200).json(item);
    } catch (error) {
        console.error("Erro ao buscar vacina:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const { nome, dataAplicacao, proximaDose, veterinario, lote } = req.body;

    if ((dataAplicacao && !eDataValida(dataAplicacao)) || (proximaDose && !eDataValida(proximaDose))) {
        return res.status(400).json({ msg: "Formato de data inválido." });
    }

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

        return res.status(200).json(item);
    } catch (error) {
        console.error("Erro na tentativa de atualizar vacina:", error);

        if (error.code === 'P2025') {
            return res.status(404).json({ msg: "Vacina não encontrada para atualização." });
        }

        return res.status(500).json({ msg: "Internal server error." });
    }
};

const excluir = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await prisma.vacina.delete({
            where: { id: Number(id) }
        });

        return res.status(200).json({ msg: "Vacina excluída com sucesso." });
    } catch (error) {
        console.error("Erro na tentativa de excluir vacina:", error);

        if (error.code === 'P2025') {
            return res.status(404).json({ msg: "Vacina não encontrada para exclusão." });
        }

        return res.status(500).json({ msg: "Internal server error." });
    }
};

module.exports = {
    cadastrar,
    listarPorAnimal,
    buscar,
    atualizar,
    excluir
};