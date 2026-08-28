const lista = document.getElementById("listaStatus");

<<<<<<< HEAD
function obterUsuario() {
    try {
        return JSON.parse(localStorage.getItem("usuarioLogado"));
    } catch (e) {
        return null;
    }
}

function carregar() {
    const usuario = obterUsuario();

    if (!usuario || localStorage.getItem("tipoUsuario") !== "adotante") {
        alert("Você precisa estar logado como adotante.");
        window.location.href = "../html/identificacao.html";
        return;
    }

    const solicitacoes =
        JSON.parse(localStorage.getItem("solicitacoes")) || [];

    const minhas = solicitacoes.filter(
        pedido => pedido.email === usuario.email
    );

    lista.innerHTML = "";

    if (minhas.length === 0) {
        lista.innerHTML = `
            <div class="card">
                <p>Você ainda não enviou nenhuma solicitação.</p>
            </div>
        `;
        return;
    }

    minhas.forEach(pedido => {
        lista.innerHTML += `
            <div class="card">
                <h2>🐾 ${pedido.pet}</h2>
                <p>Solicitação para: ${pedido.pet}</p>
                <div class="status ${pedido.status}">
                    ${mostrarMensagem(pedido.status)}
                </div>
            </div>
        `;
    });
}

function mostrarMensagem(status) {
    if (status === "Aceito") {
        return "🎉 Parabéns! Sua adoção foi aprovada!";
    }

    if (status === "Recusado") {
        return "😿 Sua solicitação não foi aprovada.";
    }

    return "⏳ Sua solicitação está sendo analisada.";
}

=======
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

>>>>>>> 8b973fd49b2adc0846d2cd963dea3e45030a95c1
carregar();
