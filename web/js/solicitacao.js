const form = document.getElementById("formAdocao");

function usuarioAtual() {
    try {
        return JSON.parse(localStorage.getItem("usuarioLogado"));
    } catch (e) {
        return null;
    }
}

const usuario = usuarioAtual();

if (!usuario || localStorage.getItem("tipoUsuario") !== "adotante") {
    alert("Você precisa estar logado como adotante para solicitar uma adoção.");
    window.location.href = "../html/identificacao.html";
} else {
    const url = new URLSearchParams(window.location.search);
    const pet = url.get("pet") || localStorage.getItem("petParaAdocao");

    if (!pet) {
        alert("Pet não encontrado.");
        window.location.href = "../html/pag-adocao.html";
    } else {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let solicitacoes =
                JSON.parse(localStorage.getItem("solicitacoes")) || [];

            const jaExiste = solicitacoes.some(
                pedido =>
                    pedido.pet === pet &&
                    pedido.email === usuario.email &&
                    pedido.status === "Pendente"
            );

            if (jaExiste) {
                alert("Você já possui uma solicitação pendente para este animal.");
                return;
            }

            const dados = {
                pet,
                nome: usuario.nome,
                email: usuario.email,
                idade: document.getElementById("idade").value,
                cidade: document.getElementById("cidade").value,
                telefone: document.getElementById("telefone").value,
                moradia: document.getElementById("moradia").value,
                espaco: document.getElementById("espaco").value,
                experiencia: document.getElementById("experiencia").value,
                motivo: document.getElementById("motivo").value,
                cuidados: document.getElementById("cuidados").value,
                status: "Pendente",
                data: new Date().toISOString()
            };

            solicitacoes.push(dados);

            localStorage.setItem(
                "solicitacoes",
                JSON.stringify(solicitacoes)
            );

            alert("Solicitação enviada com sucesso! 🐾");

            localStorage.removeItem("petParaAdocao");

            window.location.href =
                "../html/minhas-solicitacoes.html";
        });
    }
}

function irParaInicio() {
    window.location.href = "../html/pag-adocao.html";
}
