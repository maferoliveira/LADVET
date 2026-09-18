const lista =
    document.getElementById(
        "listaStatus"
    );


function mensagemStatus(status) {

    if (status === "APROVADA") {
        return "🎉 Parabéns! Sua adoção foi aprovada!";
    }

    if (status === "RECUSADA") {
        return "Sua solicitação não foi aprovada.";
    }

    return "⏳ Sua solicitação está sendo analisada.";
}


async function carregarSolicitacoes() {

    if (!protegerPagina("adotante")) {
        return;
    }


    try {

        const solicitacoes =
            await apiFetch(
                "/adocao/minhas"
            );


        lista.innerHTML = "";


        if (!solicitacoes.length) {

            lista.innerHTML =
                "<p>Você ainda não enviou nenhuma solicitação.</p>";

            return;
        }


        solicitacoes.forEach(pedido => {

            lista.innerHTML += `

                <div class="card">

                    <h2>
                        🐾
                        ${
                            pedido.animal?.nome ||
                            "Animal"
                        }
                    </h2>

                    <p>
                        Moradia:
                        ${pedido.moradia}
                    </p>

                    <p>
                        Tempo disponível:
                        ${pedido.tempoDisponivel}
                    </p>

                    <p>
                        Experiência:
                        ${pedido.experiencia || "-"}
                    </p>

                    <div
                        class="status ${pedido.status}"
                    >
                        ${mensagemStatus(
                            pedido.status
                        )}
                    </div>

                </div>

            `;
        });


    } catch (erro) {

        lista.innerHTML =
            `<p>${erro.message}</p>`;
    }
}


carregarSolicitacoes();