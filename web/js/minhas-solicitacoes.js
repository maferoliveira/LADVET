const lista = document.getElementById("listaStatus");

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

carregar();
