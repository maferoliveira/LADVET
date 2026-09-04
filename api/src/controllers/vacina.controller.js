const prisma = require("../data/prisma");

const eDataValida = (dataString) => {
    const data = new Date(dataString);
    return !isNaN(data.getTime());
};


const cadastrar = async (req, res) => {
    const {
        nome,
        dataAplicacao,
        proximaDose,
        veterinario,
        lote,
        animalID
    } = req.body;

    // Apenas a clínica pode cadastrar
    if (req.usuario.tipo_usuario !== "CLINICA") {
        return res.status(403).json({
            msg: "Apenas a clínica pode cadastrar vacinas."
        });
    }

    const idAnimal = Number(animalID);

    if (!nome || !dataAplicacao || !veterinario || !lote || !animalID) {
        return res.status(400).json({
            msg: "Nome, data de aplicação, veterinário, lote e animal são obrigatórios."
        });
    }

    if (!Number.isInteger(idAnimal) || idAnimal <= 0) {
        return res.status(400).json({
            msg: "Animal inválido."
        });
    }

    if (
        !eDataValida(dataAplicacao) ||
        (proximaDose && !eDataValida(proximaDose))
    ) {
        return res.status(400).json({
            msg: "Formato de data inválido."
        });
    }

    try {
        const animal = await prisma.animal.findUnique({
            where: {
                id: idAnimal
            }
        });

        if (!animal) {
            return res.status(404).json({
                msg: "Animal informado não existe."
            });
        }

        const item = await prisma.vacina.create({
            data: {
                nome,
                dataAplicacao: new Date(dataAplicacao),
                proximaDose: proximaDose
                    ? new Date(proximaDose)
                    : null,
                veterinario,
                lote,
                animalID: idAnimal
            }
        });

        return res.status(201).json(item);

    } catch (error) {
        console.error("Erro ao cadastrar vacina:", error);

        return res.status(500).json({
            msg: "Erro ao cadastrar vacina."
        });
    }
};


const listarPorAnimal = async (req, res) => {
    const animalID = Number(req.params.animalID);

    if (!Number.isInteger(animalID) || animalID <= 0) {
        return res.status(400).json({
            msg: "ID do animal inválido."
        });
    }

    try {
        const animal = await prisma.animal.findUnique({
            where: {
                id: animalID
            }
        });

        if (!animal) {
            return res.status(404).json({
                msg: "Animal não encontrado."
            });
        }

        const lista = await prisma.vacina.findMany({
            where: {
                animalID
            },
            orderBy: {
                dataAplicacao: "desc"
            }
        });

        return res.status(200).json(lista);

    } catch (error) {
        console.error("Erro ao listar vacinas:", error);

        return res.status(500).json({
            msg: "Erro ao listar vacinas."
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
        const item = await prisma.vacina.findUnique({
            where: {
                id
            }
        });

        if (!item) {
            return res.status(404).json({
                msg: "Vacina não encontrada."
            });
        }

        return res.status(200).json(item);

    } catch (error) {
        console.error("Erro ao buscar vacina:", error);

        return res.status(500).json({
            msg: "Erro ao buscar vacina."
        });
    }
};


const atualizar = async (req, res) => {
    const id = Number(req.params.id);

    // Apenas a clínica pode atualizar
    if (req.usuario.tipo_usuario !== "CLINICA") {
        return res.status(403).json({
            msg: "Apenas a clínica pode atualizar vacinas."
        });
    }

    const {
        nome,
        dataAplicacao,
        proximaDose,
        veterinario,
        lote
    } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            msg: "ID inválido."
        });
    }

    if (
        (dataAplicacao && !eDataValida(dataAplicacao)) ||
        (proximaDose && !eDataValida(proximaDose))
    ) {
        return res.status(400).json({
            msg: "Formato de data inválido."
        });
    }

    try {
        const vacina = await prisma.vacina.findUnique({
            where: { id }
        });

        if (!vacina) {
            return res.status(404).json({
                msg: "Vacina não encontrada."
            });
        }

        const dados = {};

        if (nome !== undefined) dados.nome = nome;
        if (dataAplicacao !== undefined) {
            dados.dataAplicacao = new Date(dataAplicacao);
        }
        if (proximaDose !== undefined) {
            dados.proximaDose = proximaDose
                ? new Date(proximaDose)
                : null;
        }
        if (veterinario !== undefined) dados.veterinario = veterinario;
        if (lote !== undefined) dados.lote = lote;

        const item = await prisma.vacina.update({
            where: { id },
            data: dados
        });

        return res.status(200).json(item);

    } catch (error) {
        console.error("Erro ao atualizar vacina:", error);

        return res.status(500).json({
            msg: "Erro ao atualizar vacina."
        });
    }
};


const excluir = async (req, res) => {
    const id = Number(req.params.id);

    console.log("ID DA VACINA:", id);
    console.log("USUARIO:", req.usuario);

    if (req.usuario.tipo_usuario !== "CLINICA") {
        return res.status(403).json({
            msg: "Apenas a clínica pode excluir vacinas."
        });
    }

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            msg: "ID inválido."
        });
    }

    try {
        const vacina = await prisma.vacina.findUnique({
            where: { id }
        });

        console.log("VACINA ENCONTRADA:", vacina);

        if (!vacina) {
            return res.status(404).json({
                msg: "Vacina não encontrada."
            });
        }

        await prisma.vacina.delete({
            where: { id }
        });

        console.log("VACINA DELETADA!");

        return res.status(200).json({
            msg: "Vacina excluída com sucesso."
        });

    } catch (error) {
        console.error("ERRO REAL AO EXCLUIR:", error);

        return res.status(500).json({
            msg: "Erro ao excluir vacina."
        });
    }
};

module.exports = {
    cadastrar,
    listarPorAnimal,
    buscar,
    atualizar,
    excluir
};