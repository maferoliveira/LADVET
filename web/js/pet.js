const params =
    new URLSearchParams(window.location.search);

const animalID =
    Number(params.get("id"));

let vacinasAtuais = [];


/* =========================
   CARREGAR PET
========================= */

async function carregarPet() {

    if (!protegerPagina()) {
        return;
    }


    if (!animalID) {

        alert("Animal não encontrado.");

        window.location.href =
            "../html/pag-adocao.html";

        return;
    }


    try {

        const pet =
            await apiFetch(
                `/animal/buscar/${animalID}`
            );


        /* =========================
           NOME
        ========================= */

        const nome =
            document.getElementById("nomePet");

        if (nome) {

            nome.textContent =
                pet.nome || "";

        }


        /* =========================
           IDADE
        ========================= */

        const idade =
            document.getElementById("idadePet");

        if (idade) {

            idade.textContent =
                `Idade: ${pet.idade || 0} ano(s)`;

        }


        /* =========================
           ESPÉCIE
        ========================= */

        const especie =
            document.getElementById("especiePet");

        if (especie) {

            especie.textContent =
                `Espécie: ${pet.especie || "-"}`;

        }


        /* =========================
           SEXO
        ========================= */

        const sexo =
            document.getElementById("sexoPet");

        if (sexo) {

            sexo.textContent =
                `Sexo: ${pet.sexo || "-"}`;

        }


        /* =========================
           TEMPERAMENTO
        ========================= */

        const temperamento =
            document.getElementById(
                "temperamentoPet"
            );

        if (temperamento) {

            temperamento.textContent =
                `Temperamento: ${pet.temperamento || "-"}`;

        }


        /* =========================
           STATUS
        ========================= */

        const status =
            document.getElementById("statusPet");

        if (status) {

            status.textContent =
                `Status: ${pet.status || "-"}`;

        }


        /* =========================
           DESCRIÇÃO
        ========================= */

        const descricao =
            document.getElementById(
                "descricaoPet"
            );

        if (descricao) {

            if (pet.descricao) {

                descricao.textContent =
                    `Descrição: ${pet.descricao}`;

            } else {

                descricao.textContent =
                    "Descrição: Não informada.";

            }

        }


        /* =========================
           FOTO
        ========================= */

        const foto =
            document.getElementById("fotoPet");


        if (foto) {

            if (pet.foto) {

                const caminhoFoto =
                    pet.foto.trim();


                /* FOTO EM BASE64 */

                if (
                    caminhoFoto.startsWith(
                        "data:image"
                    )
                ) {

                    foto.src =
                        caminhoFoto;

                }


                /* FOTO EM URL */

                else if (
                    caminhoFoto.startsWith(
                        "http://"
                    ) ||
                    caminhoFoto.startsWith(
                        "https://"
                    )
                ) {

                    foto.src =
                        caminhoFoto;

                }


                /* FOTO COM CAMINHO */

                else if (
                    caminhoFoto.includes("/")
                ) {

                    foto.src =
                        caminhoFoto;

                }


                /* SOMENTE NOME DO ARQUIVO */

                else {

                    foto.src =
                        `../img/${caminhoFoto}`;

                }

            } else {

                foto.src =
                    "../img/user.png";

            }


            /* FOTO COM ERRO */

            foto.onerror =
                function () {

                    this.onerror = null;

                    this.src =
                        "../img/user.png";

                };

        }


        /* =========================
           USUÁRIO LOGADO
        ========================= */

        const usuario =
            getUsuario();


        const botaoAdotar =
            document.querySelector(".adotar");


        const btnExcluir =
            document.getElementById(
                "btnExcluir"
            );


        /* =========================
           ADOTANTE
        ========================= */

        if (
            usuario &&
            usuario.tipo_usuario === "ADOTANTE"
        ) {

            if (btnExcluir) {

                btnExcluir.style.display =
                    "none";

            }


            if (botaoAdotar) {

                if (
                    pet.status !== "DISPONIVEL"
                ) {

                    botaoAdotar.style.display =
                        "none";

                } else {

                    botaoAdotar.style.display =
                        "block";


                    botaoAdotar.onclick =
                        function () {

                            window.location.href =
                                `../html/solicitacao.html?pet=${pet.id}`;

                        };

                }

            }

        }


        /* =========================
           CLÍNICA
        ========================= */

        else if (
            usuario &&
            usuario.tipo_usuario === "CLINICA"
        ) {

            /* ESCONDE ADOTAR */

            if (botaoAdotar) {

                botaoAdotar.style.display =
                    "none";

            }


            /* MOSTRA EXCLUIR ANIMAL */

            if (btnExcluir) {

                btnExcluir.style.display =
                    "block";


                btnExcluir.onclick =
                    async function () {

                        const confirmar =
                            confirm(
                                "Tem certeza que deseja excluir este animal?"
                            );


                        if (!confirmar) {

                            return;

                        }


                        try {

                            await apiFetch(
                                `/animal/excluir/${animalID}`,
                                {
                                    method: "DELETE"
                                }
                            );


                            alert(
                                "Animal excluído com sucesso!"
                            );


                            window.location.href =
                                "../html/pag-adocao.html";


                        } catch (erro) {

                            alert(
                                "Não foi possível excluir o animal: " +
                                erro.message
                            );

                        }

                    };

            }

        }


        /* =========================
           CARREGAR VACINAS
        ========================= */

        await carregarVacinas();


    } catch (erro) {

        console.error(
            "Erro ao carregar animal:",
            erro
        );


        alert(
            erro.message ||
            "Não foi possível carregar o animal."
        );

    }

}


/* =========================
   CARREGAR VACINAS
========================= */

async function carregarVacinas() {

    const tabela =
        document.getElementById(
            "tabelaVacinasBody"
        );


    const colunaAcoes =
        document.getElementById(
            "colunaAcoes"
        );


    const btnCadastrar =
        document.getElementById(
            "btnCadastrarVacina"
        );


    if (!tabela) {

        return;

    }


    try {

        const vacinas =
            await apiFetch(
                `/vacina/listar/${animalID}`
            );


        vacinasAtuais =
            vacinas || [];


        const usuario =
            getUsuario();


        const ehClinica =
            usuario &&
            usuario.tipo_usuario === "CLINICA";


        /* =========================
           BOTÃO CADASTRAR
        ========================= */

        if (btnCadastrar) {

            if (ehClinica) {

                btnCadastrar.style.display =
                    "block";

            } else {

                btnCadastrar.style.display =
                    "none";

            }

        }


        /* =========================
           COLUNA AÇÕES
        ========================= */

        if (colunaAcoes) {

            if (ehClinica) {

                colunaAcoes.style.display =
                    "table-cell";

            } else {

                colunaAcoes.style.display =
                    "none";

            }

        }


        /* LIMPA A TABELA */

        tabela.innerHTML = "";


        /* =========================
           NENHUMA VACINA
        ========================= */

        if (
            !vacinasAtuais ||
            !vacinasAtuais.length
        ) {

            const linha =
                document.createElement("tr");


            linha.innerHTML = `

                <td colspan="${ehClinica ? 6 : 5}">
                    Nenhuma vacina cadastrada.
                </td>

            `;


            tabela.appendChild(
                linha
            );


            configurarBotaoCadastrar();


            return;

        }


        /* =========================
           CRIAR LINHAS
        ========================= */

        vacinasAtuais.forEach(
            function (vacina) {

                const linha =
                    document.createElement("tr");


                const dataAplicacao =
                    formatarData(
                        vacina.dataAplicacao
                    );


                const proximaDose =
                    formatarData(
                        vacina.proximaDose
                    );


                linha.innerHTML = `

                    <td>
                        ${vacina.nome || "-"}
                    </td>

                    <td>
                        ${dataAplicacao || "-"}
                    </td>

                    <td>
                        ${proximaDose || "-"}
                    </td>

                    <td>
                        ${vacina.veterinario || "-"}
                    </td>

                    <td>
                        ${vacina.lote || "-"}
                    </td>

                `;


                /* =========================
                   AÇÕES DA CLÍNICA
                ========================= */

                if (ehClinica) {

                    const celulaAcoes =
                        document.createElement(
                            "td"
                        );


                    const divAcoes =
                        document.createElement(
                            "div"
                        );


                    divAcoes.className =
                        "acoes-vacina";


                    /* BOTÃO EDITAR */

                    const btnEditar =
                        document.createElement(
                            "button"
                        );


                    btnEditar.type =
                        "button";


                    btnEditar.className =
                        "btn-editar-vacina";


                    btnEditar.textContent =
                        "Editar";


                    btnEditar.onclick =
                        function () {

                            editarVacina(
                                vacina.id
                            );

                        };


                    /* BOTÃO EXCLUIR */

                    const btnExcluirVacina =
                        document.createElement(
                            "button"
                        );


                    btnExcluirVacina.type =
                        "button";


                    btnExcluirVacina.className =
                        "btn-excluir-vacina";


                    btnExcluirVacina.textContent =
                        "Excluir";


                    btnExcluirVacina.onclick =
                        function () {

                            excluirVacina(
                                vacina.id
                            );

                        };


                    divAcoes.appendChild(
                        btnEditar
                    );


                    divAcoes.appendChild(
                        btnExcluirVacina
                    );


                    celulaAcoes.appendChild(
                        divAcoes
                    );


                    linha.appendChild(
                        celulaAcoes
                    );

                }


                tabela.appendChild(
                    linha
                );

            }
        );


        configurarBotaoCadastrar();


    } catch (erro) {

        console.error(
            "Erro ao carregar vacinas:",
            erro
        );


        tabela.innerHTML = `

            <tr>

                <td colspan="5">
                    Não foi possível carregar as vacinas.
                </td>

            </tr>

        `;

    }

}


/* =========================
   BOTÃO CADASTRAR
========================= */

function configurarBotaoCadastrar() {

    const btnCadastrar =
        document.getElementById(
            "btnCadastrarVacina"
        );


    if (!btnCadastrar) {

        return;

    }


    const usuario =
        getUsuario();


    if (
        !usuario ||
        usuario.tipo_usuario !== "CLINICA"
    ) {

        btnCadastrar.style.display =
            "none";

        return;

    }


    btnCadastrar.style.display =
        "block";


    btnCadastrar.onclick =
        function () {

            abrirFormularioVacina();

        };

}


/* =========================
   ABRIR FORMULÁRIO
========================= */

function abrirFormularioVacina(
    vacina = null
) {

    const editando =
        vacina !== null;


    const titulo =
        editando
            ? "Editar vacina"
            : "Cadastrar vacina";


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "modalVacina";


    modal.style.position =
        "fixed";

    modal.style.top =
        "0";

    modal.style.left =
        "0";

    modal.style.width =
        "100%";

    modal.style.height =
        "100%";

    modal.style.background =
        "rgba(0, 0, 0, 0.35)";

    modal.style.display =
        "flex";

    modal.style.alignItems =
        "center";

    modal.style.justifyContent =
        "center";

    modal.style.zIndex =
        "1000";


    modal.innerHTML = `

        <div style="
            width: 420px;
            max-width: 90%;
            background: #f8eeee;
            border-radius: 18px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,.2);
        ">

            <h2 style="
                color: #7d5555;
                margin-bottom: 20px;
            ">
                ${titulo}
            </h2>


            <label>
                Vacina
            </label>

            <input
                id="nomeVacina"
                type="text"
                value="${editando ? vacina.nome || "" : ""}"
                placeholder="Nome da vacina"
                style="
                    width:100%;
                    padding:10px;
                    margin:6px 0 12px;
                    border:1px solid #d5c5c5;
                    border-radius:7px;
                "
            >


            <label>
                Data de aplicação
            </label>

            <input
                id="dataAplicacaoVacina"
                type="date"
                value="${
                    editando
                        ? formatarDataInput(
                            vacina.dataAplicacao
                        )
                        : ""
                }"
                style="
                    width:100%;
                    padding:10px;
                    margin:6px 0 12px;
                    border:1px solid #d5c5c5;
                    border-radius:7px;
                "
            >


            <label>
                Próxima dose
            </label>

            <input
                id="proximaDoseVacina"
                type="date"
                value="${
                    editando
                        ? formatarDataInput(
                            vacina.proximaDose
                        )
                        : ""
                }"
                style="
                    width:100%;
                    padding:10px;
                    margin:6px 0 12px;
                    border:1px solid #d5c5c5;
                    border-radius:7px;
                "
            >


            <label>
                Veterinário
            </label>

            <input
                id="veterinarioVacina"
                type="text"
                value="${
                    editando
                        ? vacina.veterinario || ""
                        : ""
                }"
                placeholder="Nome do veterinário"
                style="
                    width:100%;
                    padding:10px;
                    margin:6px 0 12px;
                    border:1px solid #d5c5c5;
                    border-radius:7px;
                "
            >


            <label>
                Lote
            </label>

            <input
                id="loteVacina"
                type="text"
                value="${
                    editando
                        ? vacina.lote || ""
                        : ""
                }"
                placeholder="Lote da vacina"
                style="
                    width:100%;
                    padding:10px;
                    margin:6px 0 18px;
                    border:1px solid #d5c5c5;
                    border-radius:7px;
                "
            >


            <div style="
                display:flex;
                gap:10px;
                justify-content:flex-end;
            ">

                <button
                    type="button"
                    id="btnCancelarVacina"
                    style="
                        border:none;
                        border-radius:8px;
                        padding:10px 15px;
                        background:#999;
                        color:white;
                        font-weight:bold;
                        cursor:pointer;
                    "
                >
                    Cancelar
                </button>


                <button
                    type="button"
                    id="btnSalvarVacina"
                    style="
                        border:none;
                        border-radius:8px;
                        padding:10px 15px;
                        background:#6f7ba3;
                        color:white;
                        font-weight:bold;
                        cursor:pointer;
                    "
                >
                    Salvar
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    /* CANCELAR */

    document.getElementById(
        "btnCancelarVacina"
    ).onclick =
        function () {

            modal.remove();

        };


    /* SALVAR */

    document.getElementById(
        "btnSalvarVacina"
    ).onclick =
        async function () {

            await salvarVacina(
                editando
                    ? vacina.id
                    : null
            );

        };

}


/* =========================
   SALVAR / CADASTRAR VACINA
========================= */

async function salvarVacina(
    vacinaID = null
) {

    const nome =
        document.getElementById(
            "nomeVacina"
        )?.value.trim();


    const dataAplicacao =
        document.getElementById(
            "dataAplicacaoVacina"
        )?.value;


    const proximaDose =
        document.getElementById(
            "proximaDoseVacina"
        )?.value;


    const veterinario =
        document.getElementById(
            "veterinarioVacina"
        )?.value.trim();


    const lote =
        document.getElementById(
            "loteVacina"
        )?.value.trim();


    /* =========================
       VALIDAÇÃO
    ========================= */

    if (
        !nome ||
        !dataAplicacao ||
        !veterinario ||
        !lote
    ) {

        alert(
            "Preencha todos os campos obrigatórios."
        );

        return;

    }


    const dados = {

        nome: nome,

        dataAplicacao:
            dataAplicacao,

        veterinario:
            veterinario,

        lote:
            lote,

        animalID:
            animalID

    };


    if (proximaDose) {

        dados.proximaDose =
            proximaDose;

    } else {

        dados.proximaDose =
            null;

    }


    try {

        /* =========================
           EDITAR
        ========================= */

        if (vacinaID) {

            await apiFetch(
                `/vacina/atualizar/${vacinaID}`,
                {
                    method: "PUT",

                    body:
                        JSON.stringify(
                            dados
                        )
                }
            );


            alert(
                "Vacina atualizada com sucesso!"
            );

        }


        /* =========================
           CADASTRAR
        ========================= */

        else {

            await apiFetch(
                "/vacina/cadastrar",
                {
                    method: "POST",

                    body:
                        JSON.stringify(
                            dados
                        )
                }
            );


            alert(
                "Vacina cadastrada com sucesso!"
            );

        }


        /* FECHA FORMULÁRIO */

        const modal =
            document.getElementById(
                "modalVacina"
            );


        if (modal) {

            modal.remove();

        }


        /* ATUALIZA TABELA */

        await carregarVacinas();


    } catch (erro) {

        console.error(
            "Erro ao salvar vacina:",
            erro
        );


        alert(
            "Não foi possível salvar a vacina: " +
            erro.message
        );

    }

}


/* =========================
   EDITAR VACINA
========================= */

function editarVacina(
    vacinaID
) {

    const vacina =
        vacinasAtuais.find(
            function (item) {

                return item.id === vacinaID;

            }
        );


    if (!vacina) {

        alert(
            "Vacina não encontrada."
        );

        return;

    }


    abrirFormularioVacina(
        vacina
    );

}


/* =========================
   EXCLUIR VACINA
========================= */

async function excluirVacina(
    vacinaID
) {

    const confirmar =
        confirm(
            "Tem certeza que deseja excluir esta vacina?"
        );


    if (!confirmar) {

        return;

    }


    try {

        await apiFetch(
            `/vacina/excluir/${vacinaID}`,
            {
                method: "DELETE"
            }
        );


        alert(
            "Vacina excluída com sucesso!"
        );


        await carregarVacinas();


    } catch (erro) {

        console.error(
            "Erro ao excluir vacina:",
            erro
        );


        alert(
            "Não foi possível excluir a vacina: " +
            erro.message
        );

    }

}


/* =========================
   FORMATAR DATA
========================= */

function formatarData(data) {

    if (!data) {

        return "";

    }


    /*
       Quando o backend retorna:

       2026-09-21T00:00:00.000Z

       pegamos somente:

       2026-09-21

       Assim evitamos problemas
       de fuso horário.
    */

    const texto =
        String(data);


    if (
        texto.includes("T")
    ) {

        const partes =
            texto.split("T");


        const dataParte =
            partes[0];


        const valores =
            dataParte.split("-");


        if (
            valores.length === 3
        ) {

            return (
                valores[2] +
                "/" +
                valores[1] +
                "/" +
                valores[0]
            );

        }

    }


    /*
       Caso venha somente:

       2026-09-21
    */

    if (
        texto.match(
            /^\d{4}-\d{2}-\d{2}$/
        )
    ) {

        const valores =
            texto.split("-");


        return (
            valores[2] +
            "/" +
            valores[1] +
            "/" +
            valores[0]
        );

    }


    return texto;

}


/* =========================
   DATA PARA INPUT
========================= */

function formatarDataInput(
    data
) {

    if (!data) {

        return "";

    }


    const texto =
        String(data);


    if (
        texto.includes("T")
    ) {

        return texto.split("T")[0];

    }


    if (
        texto.match(
            /^\d{4}-\d{2}-\d{2}$/
        )
    ) {

        return texto;

    }


    return "";

}


/* =========================
   VOLTAR
========================= */

function voltarAdocao() {

    window.location.href =
        "../html/pag-adocao.html";

}


/* =========================
   INICIAR
========================= */

carregarPet();