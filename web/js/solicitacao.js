const form = document.getElementById("formAdocao");
const params = new URLSearchParams(window.location.search);
const animalID = Number(params.get("pet"));

if (form) {
    form.addEventListener("submit", async event => {
        event.preventDefault();

        if (!protegerPagina("adotante")) return;

        if (!animalID) {
            alert("Pet não encontrado.");
            return;
        }

        const espaco = document.getElementById("espaco")?.value.trim() || "";
        const dados = {
            animalID,
            moradia: document.getElementById("moradia")?.value,
            temQuintal: /quintal|casa|chácara/i.test(espaco),
            experiencia: document.getElementById("experiencia")?.value.trim() || "",
            tempoDisponivel: document.getElementById("cuidados")?.value.trim() || ""
        };

        try {
            await apiFetch("/adocao/cadastrar", {
                method: "POST",
                body: JSON.stringify(dados)
            });

            alert("Solicitação enviada com sucesso! 🐾");
            window.location.href = "minhas-solicitacoes.html";
        } catch (erro) {
            alert(erro.message);
        }
    });
}

function irParaInicio() {
    window.location.href = "pag-adocao.html";
}
