const listaSolicitacoes =
    document.getElementById(
        "listaSolicitacoes"
    );

<<<<<<< HEAD
async function carregarSolicitacoes() {
    if (!protegerPagina("veterinario")) return;
=======

async function carregarSolicitacoesClinica() {

    if (!protegerPagina("veterinario")) {
        return;
    }

>>>>>>> 23d6582e705e51f51230aa664c3aa93353adf961

    try {

        const solicitacoes =
            await apiFetch(
                "/adocao/listar"
            );


        listaSolicitacoes.innerHTML = "";


        if (!solicitacoes.length) {

            listaSolicitacoes.innerHTML =
                "<p>Nenhuma solicitação encontrada.</p>";

            return;
        }


        solicitacoes.forEach(pedido => {
<<<<<<< HEAD
            const finalizada = ["APROVADA", "RECUSADA"].includes(pedido.status);

            lista.innerHTML += `
                <div class="solicitacao">
                    <h2>🐾 ${pedido.animal?.nome || "Animal"}</h2>
                    <p><b>Nome:</b> ${pedido.adotante?.nome || "-"}</p>
                    <p><b>Email:</b> ${pedido.adotante?.email || "-"}</p>
                    <p><b>Cidade:</b> ${pedido.adotante?.cidade || "-"}</p>
                    <p><b>Telefone:</b> ${pedido.adotante?.telefone || "-"}</p>
                    <p><b>Moradia:</b> ${pedido.moradia || "-"}</p>
                    <p><b>Quintal:</b> ${pedido.temQuintal ? "Sim" : "Não"}</p>
                    <p><b>Experiência:</b> ${pedido.experiencia || "-"}</p>
                    <p><b>Tempo disponível:</b> ${pedido.tempoDisponivel || "-"}</p>
                    <h3>Status: ${pedido.status}</h3>
                    ${!finalizada ? `
                        <div class="botoes">
                            <button class="aceitar" onclick="atualizarStatus(${pedido.id}, 'APROVADA')">Aceitar</button>
                            <button class="recusar" onclick="atualizarStatus(${pedido.id}, 'RECUSADA')">Recusar</button>
                        </div>
                    ` : ""}
=======

            listaSolicitacoes.innerHTML += `

                <div class="solicitacao">

                    <h2>
                        🐾
                        ${
                            pedido.animal?.nome ||
                            "Animal"
                        }
                    </h2>

                    <p>
                        <strong>Adotante:</strong>
                        ${
                            pedido.adotante?.nome ||
                            "-"
                        }
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${
                            pedido.adotante?.email ||
                            "-"
                        }
                    </p>

                    <p>
                        <strong>Telefone:</strong>
                        ${
                            pedido.adotante?.telefone ||
                            "-"
                        }
                    </p>

                    <p>
                        <strong>Cidade:</strong>
                        ${
                            pedido.adotante?.cidade ||
                            "-"
                        }
                    </p>

                    <p>
                        <strong>Moradia:</strong>
                        ${pedido.moradia}
                    </p>

                    <p>
                        <strong>Experiência:</strong>
                        ${
                            pedido.experiencia ||
                            "-"
                        }
                    </p>

                    <p>
                        <strong>Tempo disponível:</strong>
                        ${pedido.tempoDisponivel}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${pedido.status}
                    </p>

                    ${
                        pedido.status === "PENDENTE"
                            ? `

                                <div class="acoes">

                                    <button
                                        onclick="aprovarSolicitacao(${pedido.id})"
                                    >
                                        Aprovar
                                    </button>

                                    <button
                                        onclick="recusarSolicitacao(${pedido.id})"
                                    >
                                        Recusar
                                    </button>

                                </div>

                              `
                            : ""
                    }

>>>>>>> 23d6582e705e51f51230aa664c3aa93353adf961
                </div>

            `;
        });


    } catch (erro) {

        listaSolicitacoes.innerHTML =
            `<p>${erro.message}</p>`;
    }
}


async function alterarStatus(id, status) {

    try {
<<<<<<< HEAD
        await apiFetch(`/adocao/atualizar/${id}`, {
            method: "PUT",
            body: JSON.stringify({ status })
        });

        alert(status === "APROVADA" ? "Adoção aprovada! 🐾" : "Adoção recusada.");
        carregarSolicitacoes();
=======

        await apiFetch(
            `/adocao/atualizar/${id}`,
            {
                method: "PUT",

                body: JSON.stringify({
                    status
                })
            }
        );

        alert(
            status === "APROVADA"
                ? "Solicitação aprovada!"
                : "Solicitação recusada!"
        );

        carregarSolicitacoesClinica();

>>>>>>> 23d6582e705e51f51230aa664c3aa93353adf961
    } catch (erro) {

        alert(erro.message);
    }
}

<<<<<<< HEAD
carregarSolicitacoes();
=======

function aprovarSolicitacao(id) {

    alterarStatus(
        id,
        "APROVADA"
    );
}


function recusarSolicitacao(id) {

    alterarStatus(
        id,
        "RECUSADA"
    );
}


carregarSolicitacoesClinica();
>>>>>>> 23d6582e705e51f51230aa664c3aa93353adf961
