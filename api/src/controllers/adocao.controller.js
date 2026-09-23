const prisma = require("../data/prisma");


// CADASTRAR SOLICITAÇÃO
const cadastrar = async (req, res) => {

    const {
        animalID,
        motivo,
        tempoDisponivel
    } = req.body;


    // Apenas adotantes podem solicitar adoção
    if (req.usuario.tipo_usuario !== "ADOTANTE") {

        return res.status(403).json({
            msg: "Apenas adotantes podem solicitar adoção."
        });

    }


    if (!animalID || !motivo || !tempoDisponivel) {

        return res.status(400).json({
            msg: "Animal, motivo e tempo disponível são obrigatórios."
        });

    }


    try {

        // Busca o usuário que está logado
        const adotante = await prisma.usuario.findUnique({

            where: {
                id: Number(req.usuario.id)
            }

        });


        if (!adotante) {

            return res.status(404).json({
                msg: "Adotante não encontrado."
            });

        }


        // Confirma se o animal existe
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


        /*
         * Os dados abaixo vêm automaticamente
         * do cadastro do adotante.
         */

        const moradia =
            adotante.residencia || "";

        const experiencia =
            adotante.experiencia || "";

        const temQuintal =
            adotante.espaco
                ? /quintal/i.test(adotante.espaco)
                : false;


        const item = await prisma.adocao.create({

            data: {

                animalID: Number(animalID),

                adotanteID:
                    Number(req.usuario.id),

                moradia,

                temQuintal,

                experiencia:
                    experiencia || null,

                motivo,

                tempoDisponivel,

                status: "PENDENTE"

            }

        });


        // Animal entra em processo de adoção
        await prisma.animal.update({

            where: {
                id: Number(animalID)
            },

            data: {

                status: "EM_PROCESSO"

            }

        });


        return res.status(201).json(item);


    } catch (error) {

        console.error(
            "Erro ao salvar adoção:",
            error
        );


        return res.status(500).json({
            msg: "Erro ao salvar a adoção."
        });

    }

};


// LISTAR TODAS AS ADOÇÕES - CLÍNICA
const listar = async (req, res) => {

    if (req.usuario.tipo_usuario !== "CLINICA") {

        return res.status(403).json({
            msg: "Apenas a clínica pode listar todas as adoções."
        });

    }


    try {

        const lista =
            await prisma.adocao.findMany({

                include: {

                    animal: true,

                    adotante: {

                        select: {

                            id: true,

                            nome: true,

                            email: true,

                            telefone: true,

                            cidade: true,

                            cep: true,

                            endereco: true,

                            bairro: true,

                            numero: true,

                            residencia: true,

                            espaco: true,

                            experiencia: true,

                            rotina: true

                        }

                    }

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


// LISTAR SOLICITAÇÕES DO ADOTANTE LOGADO
const listarMinhas = async (req, res) => {

    if (req.usuario.tipo_usuario !== "ADOTANTE") {

        return res.status(403).json({
            msg: "Apenas adotantes possuem solicitações de adoção."
        });

    }


    try {

        const lista =
            await prisma.adocao.findMany({

                where: {

                    adotanteID:
                        Number(req.usuario.id)

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


// BUSCAR UMA ADOÇÃO
const buscar = async (req, res) => {

    const id =
        Number(req.params.id);


    if (!Number.isInteger(id) || id <= 0) {

        return res.status(400).json({
            msg: "ID inválido."
        });

    }


    try {

        const item =
            await prisma.adocao.findUnique({

                where: {
                    id
                },

                include: {

                    animal: true,

                    adotante: {

                        select: {

                            id: true,

                            nome: true,

                            email: true,

                            telefone: true,

                            cidade: true,

                            cep: true,

                            endereco: true,

                            bairro: true,

                            numero: true,

                            residencia: true,

                            espaco: true,

                            experiencia: true,

                            rotina: true

                        }

                    }

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
            item.adotanteID !== Number(req.usuario.id)
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


// ATUALIZAR STATUS
const atualizar = async (req, res) => {

    const id =
        Number(req.params.id);

    const status =
        req.body.status;


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


    if (
        !["APROVADA", "RECUSADA"].includes(status)
    ) {

        return res.status(400).json({
            msg: "Status inválido. Use APROVADA ou RECUSADA."
        });

    }


    try {

        const adocao =
            await prisma.adocao.findUnique({

                where: {
                    id
                }

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


        const item =
            await prisma.adocao.update({

                where: {
                    id
                },

                data: {
                    status
                }

            });


        // Se aprovada, animal fica adotado
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

        // Se recusada, animal volta a ficar disponível
        else if (status === "RECUSADA") {

            await prisma.animal.update({

                where: {
                    id: item.animalID
                },

                data: {
                    status: "DISPONIVEL"
                }

            });

        }


        return res.status(200).json(item);


    } catch (error) {

        console.error(
            "Erro ao atualizar adoção:",
            error
        );


        return res.status(500).json({
            msg: "Erro ao atualizar adoção."
        });

    }

};


// EXCLUIR ADOÇÃO
const excluir = async (req, res) => {

    const id =
        Number(req.params.id);


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

        const adocao =
            await prisma.adocao.findUnique({

                where: {
                    id
                }

            });


        if (!adocao) {

            return res.status(404).json({
                msg: "Registro de adoção não encontrado."
            });

        }


        // Se ainda estiver pendente,
        // animal volta a ficar disponível
        if (adocao.status === "PENDENTE") {

            await prisma.animal.update({

                where: {
                    id: adocao.animalID
                },

                data: {
                    status: "DISPONIVEL"
                }

            });

        }


        await prisma.adocao.delete({

            where: {
                id
            }

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