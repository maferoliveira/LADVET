const lista = document.getElementById("listaStatus");

function mensagem(status) {
    if (status === "APROVADA") return "🎉 Parabéns! Sua adoção foi aprovada!";
    if (status === "RECUSADA") return "😿 Sua solicitação não foi aprovada.";
    return "⏳ Sua solicitação está sendo analisada.";
}

async function carregar() {
    if (!getToken()) {
        lista.innerHTML = "<p>Faça login para visualizar suas solicitações.</p>";
        return;
    }

    try {
        const solicitacoes = await apiFetch("/adocao/minhas");
        lista.innerHTML = "";

        if (!solicitacoes.length) {
            lista.innerHTML = "<p>Você ainda não enviou nenhuma solicitação.</p>";
            return;
        }

        solicitacoes.forEach(pedido => {
            lista.innerHTML += `
                <div class="card">
                    <h2>🐾 ${pedido.animal?.nome || "Animal"}</h2>
                    <p>Solicitação para: ${pedido.animal?.nome || "-"}</p>
                    <div class="status ${pedido.status}">${mensagem(pedido.status)}</div>
                </div>
            `;
        });
    } catch (erro) {
        lista.innerHTML = `<p>${erro.message}</p>`;
    }
}

carregar();
