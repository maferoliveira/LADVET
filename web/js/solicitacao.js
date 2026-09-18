const form =
    document.getElementById("formAdocao");

<<<<<<< HEAD
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
=======
const params =
    new URLSearchParams(
        window.location.search
    );

const animalID =
    Number(params.get("pet"));


if (!getToken()) {

    alert(
        "Você precisa estar logado como adotante."
    );

    window.location.href =
        "../html/login.html";
}


form?.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        if (!animalID) {

            alert(
                "Animal não encontrado."
            );

            return;
        }


        const dados = {

            animalID,

            moradia:
                document.getElementById(
                    "moradia"
                ).value,

            temQuintal:
                /quintal/i.test(
                    document.getElementById(
                        "espaco"
                    ).value
                ),

            experiencia:
                document.getElementById(
                    "experiencia"
                ).value,

            tempoDisponivel:
                document.getElementById(
                    "cuidados"
                ).value

        };


        try {

            await apiFetch(
                "/adocao/cadastrar",
                {
                    method: "POST",

                    body:
                        JSON.stringify(dados)
                }
            );


            alert(
                "Solicitação enviada com sucesso! 🐾"
            );


            window.location.href =
                "../html/minhas-solicitacoes.html";


        } catch (erro) {

            alert(erro.message);
        }

    }
);
>>>>>>> 23d6582e705e51f51230aa664c3aa93353adf961
