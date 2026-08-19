const form = document.getElementById("formAdocao");
const params = new URLSearchParams(window.location.search);
const animalID = Number(params.get("pet"));

form.addEventListener("submit", async event => {
    event.preventDefault();

    if (!getToken()) {
        alert("Faça login para enviar uma solicitação.");
        window.location.href = "login.html";
        return;
    }

    const moradia = document.getElementById("moradia").value;
    const espaco = document.getElementById("espaco").value;
    const experiencia = document.getElementById("experiencia").value;
    const cuidados = document.getElementById("cuidados").value;

    const dados = {
        animalID,
        moradia,
        temQuintal: /quintal|casa/i.test(espaco),
        experiencia,
        tempoDisponivel: cuidados
    };

    try {
        await apiFetch("/adocao/cadastrar", {
            method: "POST",
            body: JSON.stringify(dados)
        });

        alert("Solicitação enviada com sucesso! 🐾");
        form.reset();
        window.location.href = "minhas-solicitacoes.html";
    } catch (erro) {
        alert(erro.message);
    }
});

function irParaInicio() {
    window.location.href = "pag-adocao.html";
}
