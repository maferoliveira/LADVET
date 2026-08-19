const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    if (!data.nome || !data.especie || data.idade === undefined || !data.sexo) {
        return res.status(400).json({ msg: "Nome, espécie, idade e sexo são obrigatórios." });
    }

    try {
        const item = await prisma.animal.create({
            data: {
                nome: data.nome,
                especie: data.especie,
                raca: data.raca || "Não informado",
                idade: Number(data.idade),
                sexo: data.sexo,
                porte: data.porte || "Não informado",
                temperamento: data.temperamento || null,
                foto: data.foto || "",
                status: data.status || "DISPONIVEL",
                usuarioID: req.usuario.id
            }
        });

        return res.status(201).json(item);
    } catch (error) {
        console.error("Erro ao cadastrar animal:", error);
        return res.status(500).json({ msg: "Erro ao cadastrar animal." });
    }
};

const listar = async (req, res) => {
    const { especie, porte, idade } = req.query;
    const where = {};

    if (especie) where.especie = especie;
    if (porte) where.porte = porte;
    if (idade) where.idade = Number(idade);

    try {
        const lista = await prisma.animal.findMany({
            where,
            orderBy: { id: "desc" }
        });
        return res.status(200).json(lista);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Erro ao listar animais." });
    }
};

const buscar = async (req, res) => {
    try {
        const item = await prisma.animal.findUnique({
            where: { id: Number(req.params.id) }
        });

        if (!item) return res.status(404).json({ msg: "Animal não encontrado." });
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({ msg: "Erro ao buscar animal." });
    }
};

const atualizar = async (req, res) => {
    try {
        const dados = { ...req.body };
        delete dados.id;
        delete dados.usuarioID;

        if (dados.idade !== undefined) dados.idade = Number(dados.idade);

        const item = await prisma.animal.update({
            where: { id: Number(req.params.id) },
            data: dados
        });

        return res.status(200).json(item);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Erro ao atualizar animal." });
    }
};

const excluir = async (req, res) => {
    try {
        await prisma.animal.delete({
            where: { id: Number(req.params.id) }
        });
        return res.status(200).json({ msg: "Animal excluído com sucesso." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Erro ao excluir animal." });
    }
};

module.exports = { cadastrar, listar, buscar, atualizar, excluir };
