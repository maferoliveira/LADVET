const form = document.getElementById("formAdocao");

const params = new URLSearchParams(
    window.location.search
);

const animalID = Number(params.get("pet"));


if (!getToken()) {

    alert(
        "Você precisa estar logado como adotante."
    );

    window.location.href =
        "../html/login.html";
}


form?.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        if (!animalID) {

            alert(
                "Animal não encontrado."
            );

            return;
        }


        const motivo =
            document.getElementById("motivo").value.trim();

        const tempoDisponivel =
            document.getElementById("cuidados").value.trim();


        if (!motivo || !tempoDisponivel) {

            alert(
                "Preencha todos os campos."
            );

            return;
        }


        const dados = {

            animalID,

            motivo,

            tempoDisponivel

        };


        try {

            await apiFetch(
                "/adocao/cadastrar",
                {
                    method: "POST",
                    body: JSON.stringify(dados)
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