const lista = document.getElementById("listaSolicitacoes");

async function carregarSolicitacoes() {
    try {
        const solicitacoes = await apiFetch("/adocao/listar");
        lista.innerHTML = "";

        if (!solicitacoes.length) {
            lista.innerHTML = "<p>Nenhuma solicitação recebida.</p>";
            return;
        }

        solicitacoes.forEach(pedido => {
            lista.innerHTML += `
                <div class="solicitacao">
                    <h2>🐾 ${pedido.animal?.nome || "Animal"}</h2>
                    <p><b>Nome:</b> ${pedido.adotante?.nome || "-"}</p>
                    <p><b>Cidade:</b> ${pedido.adotante?.cidade || "-"}</p>
                    <p><b>Telefone:</b> ${pedido.adotante?.telefone || "-"}</p>
                    <p><b>Moradia:</b> ${pedido.moradia}</p>
                    <p><b>Experiência:</b> ${pedido.experiencia || "-"}</p>
                    <p><b>Tempo disponível:</b> ${pedido.tempoDisponivel}</p>
                    <h3>Status: ${pedido.status}</h3>
                    <div class="botoes">
                        <button class="aceitar" onclick="atualizarStatus(${pedido.id}, 'APROVADA')">Aceitar</button>
                        <button class="recusar" onclick="atualizarStatus(${pedido.id}, 'RECUSADA')">Recusar</button>
                    </div>
                </div>
            `;
        });
    } catch (erro) {
        lista.innerHTML = `<p>${erro.message}</p>`;
    }
}

async function atualizarStatus(id, status) {
    try {
        await apiFetch(`/adocao/atualizar/${id}`, {
            method: "PUT",
            body: JSON.stringify({ status })
        });
        alert(status === "APROVADA" ? "Adoção aprovada! 🐾" : "Adoção recusada.");
        carregarSolicitacoes();
    } catch (erro) {
        alert(erro.message);
    }
}

carregarSolicitacoes();
