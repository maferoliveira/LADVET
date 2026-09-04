const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    // Apenas a clínica pode cadastrar animais
    if (req.usuario.tipo_usuario !== "CLINICA") {
        return res.status(403).json({
            msg: "Apenas a clínica pode cadastrar animais."
        });
    }

    if (!data.nome || !data.especie || data.idade === undefined || !data.sexo) {
        return res.status(400).json({
            msg: "Nome, espécie, idade e sexo são obrigatórios."
        });
    }

    const idade = Number(data.idade);

    if (isNaN(idade) || idade < 0) {
        return res.status(400).json({
            msg: "Idade inválida."
        });
    }

    try {
        const item = await prisma.animal.create({
            data: {
                nome: data.nome,
                especie: data.especie,
                raca: data.raca || "Não informado",
                idade: idade,
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

        return res.status(500).json({
            msg: "Erro ao cadastrar animal."
        });
    }
};


const listar = async (req, res) => {

    const { especie, porte, idade } = req.query;

    const where = {};

    // Adotante só pode visualizar animais disponíveis
    if (req.usuario.tipo_usuario === "ADOTANTE") {
        where.status = "DISPONIVEL";
    }

    if (especie) where.especie = especie;

    if (porte) where.porte = porte;

    if (idade !== undefined && idade !== "") {
        const idadeNumero = Number(idade);

        if (!isNaN(idadeNumero)) {
            where.idade = idadeNumero;
        }
    }

    try {

        const lista = await prisma.animal.findMany({
            where,
            orderBy: {
                id: "desc"
            }
        });

        return res.status(200).json(lista);

    } catch (error) {

        console.error("Erro ao listar animais:", error);

        return res.status(500).json({
            msg: "Erro ao listar animais."
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
        const item = await prisma.animal.findUnique({
            where: {
                id: id
            }
        });

        if (!item) {
            return res.status(404).json({
                msg: "Animal não encontrado."
            });
        }

        return res.status(200).json(item);

    } catch (error) {
        console.error("Erro ao buscar animal:", error);

        return res.status(500).json({
            msg: "Erro ao buscar animal."
        });
    }
};


const atualizar = async (req, res) => {
    const id = Number(req.params.id);

    // Apenas a clínica pode atualizar
    if (req.usuario.tipo_usuario !== "CLINICA") {
        return res.status(403).json({
            msg: "Apenas a clínica pode atualizar animais."
        });
    }

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            msg: "ID inválido."
        });
    }

    try {
        const animal = await prisma.animal.findUnique({
            where: { id }
        });

        if (!animal) {
            return res.status(404).json({
                msg: "Animal não encontrado."
            });
        }

        const dados = { ...req.body };

        // Não permite alterar esses campos
        delete dados.id;
        delete dados.usuarioID;
        delete dados.status;

        if (dados.idade !== undefined) {
            const idade = Number(dados.idade);

            if (isNaN(idade) || idade < 0) {
                return res.status(400).json({
                    msg: "Idade inválida."
                });
            }

            dados.idade = idade;
        }

        const item = await prisma.animal.update({
            where: { id },
            data: dados
        });

        return res.status(200).json(item);

    } catch (error) {
        console.error("Erro ao atualizar animal:", error);

        return res.status(500).json({
            msg: "Erro ao atualizar animal."
        });
    }
};


const excluir = async (req, res) => {

    const id = Number(req.params.id);

    // Apenas a clínica pode excluir
    if (req.usuario.tipo_usuario !== "CLINICA") {
        return res.status(403).json({
            msg: "Apenas a clínica pode excluir animais."
        });
    }

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            msg: "ID inválido."
        });
    }

    try {

        const animal = await prisma.animal.findUnique({
            where: { id }
        });

        if (!animal) {
            return res.status(404).json({
                msg: "Animal não encontrado."
            });
        }

        const adocao = await prisma.adocao.findFirst({
            where: {
                animalID: id
            }
        });

        const vacina = await prisma.vacina.findFirst({
            where: {
                animalID: id
            }
        });

        if (adocao || vacina) {
            return res.status(400).json({
                msg: "Não é possível excluir um animal que possui adoção ou vacinação registrada."
            });
        }

        await prisma.animal.delete({
            where: { id }
        });

        return res.status(200).json({
            msg: "Animal excluído com sucesso."
        });

    } catch (error) {

        console.error("Erro ao excluir animal:", error);

        return res.status(500).json({
            msg: "Erro ao excluir animal."
        });
    }
};


module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};