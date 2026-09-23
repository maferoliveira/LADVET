const listaSolicitacoes =
    document.getElementById(
        "listaSolicitacoes"
    );


async function carregarSolicitacoesClinica() {

    if (!protegerPagina("veterinario")) {
        return;
    }


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
                        <strong>CEP:</strong>
                        ${pedido.adotante?.cep || "-"}
                    </p>

                    <p>
                        <strong>Endereço:</strong>
                        ${pedido.adotante?.endereco || "-"}
                    </p>

                    <p>
                        <strong>Bairro:</strong>
                        ${pedido.adotante?.bairro || "-"}
                    </p>

                    <p>
                        <strong>Número:</strong>
                        ${pedido.adotante?.numero || "-"}
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
                        <strong>Espaço:</strong>
                        ${pedido.adotante?.espaco || "-"}
                    </p>

                    <p>
                        <strong>Rotina:</strong>
                        ${pedido.adotante?.rotina || "-"}
                    </p>

                    <p>
                        <strong>Motivo da adoção:</strong>
                        ${pedido.motivo || "-"}
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

    } catch (erro) {

        alert(erro.message);
    }
}


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