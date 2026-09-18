const form =
    document.getElementById("formAdocao");

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