/* ===========================
NAVEGAÇÃO
=========================== */

function irParaHome() {
    window.location.href = "../html/identificacao.html";
}

function selecionar(tipo) {

    localStorage.setItem(
        "tipoUsuario",
        tipo
    );

    if (tipo === "veterinario") {

        window.location.href =
            "../html/login-veterinario.html";

    } else {

        window.location.href =
            "../html/login.html";

    }

}

function voltarIdentificacao() {
    window.location.href = "../html/inicio.html";
}

function irParaInicio() {
    window.location.href = "../html/inicio.html";
}

function irParaCadastro() {
    window.location.href = "../html/cadastro.html";
}

function voltarLogin() {
    window.location.href = "../html/login.html";
}

function irParaHomeSistema() {
    window.location.href = "../html/home.html";
}


/* ===========================
LOGIN
=========================== */

function entrarSistema(event) {

    if (event) {
        event.preventDefault();
    }

    window.location.href =
        "../html/pag-adocao.html";

}


/* ===========================
FAVORITOS
=========================== */

function favoritar(elemento, event) {

    if (event) {
        event.stopPropagation();
    }

    const tipo =
        localStorage.getItem(
            "tipoUsuario"
        );

    if (tipo === "veterinario") {
        return;
    }

    const card =
        elemento.closest(".pet");

    if (!card) return;

    const nome =
        card.dataset.pet;

    if (!nome) return;

    let favoritos =
        JSON.parse(
            localStorage.getItem(
                "favoritos"
            )
        ) || [];

    if (
        favoritos.includes(nome)
    ) {

        favoritos =
            favoritos.filter(
                p => p !== nome
            );

        elemento.classList.remove(
            "ativo"
        );

        elemento.innerHTML =
            "♡";

    } else {

        favoritos.push(nome);

        elemento.classList.add(
            "ativo"
        );

        elemento.innerHTML =
            "♥";

    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(
            favoritos
        ));

}


/* ===========================
PET
=========================== */

function abrirPet(nomePet) {

    localStorage.setItem(
        "petSelecionado",
        nomePet
    );

    window.location.href =
        "../html/pet.html";

}


/* ===========================
PERFIL
=========================== */

function abrirPerfil() {

    window.location.href =
        "../html/perfil.html";

}

function abrirFavoritos() {

    window.location.href =
        "../html/favoritos.html";

}


/* ===========================
CADASTRO ANIMAL
=========================== */

function abrirCadastroAnimal() {

    window.location.href =
        "../html/cadastro-animal.html";

}


/* ===========================
UPLOAD FOTO
=========================== */

let sexoSelecionado = "";
let fotoSelecionada = "";

function mostrarPreview(event) {

    const arquivo =
        event.target.files[0];

    if (!arquivo) return;

    const leitor =
        new FileReader();

    leitor.onload =
        function (e) {

            fotoSelecionada =
                e.target.result;

            const texto =
                document.getElementById(
                    "nomeFoto"
                );

            if (texto) {

                texto.innerHTML =
                    arquivo.name;

            }

        };

    leitor.readAsDataURL(
        arquivo
    );

}


/* ===========================
SEXO
=========================== */

function selecionarSexo(sexo) {

    sexoSelecionado =
        sexo;

    const femea =
        document.getElementById(
            "btnFemea"
        );

    const macho =
        document.getElementById(
            "btnMacho"
        );

    if (femea) {
        femea.style.background = "#ddd";
    }

    if (macho) {
        macho.style.background = "#ddd";
    }

    if (
        sexo === "Fêmea"
        &&
        femea
    ) {

        femea.style.background =
            "#f6bfd8";

    }

    if (
        sexo === "Macho"
        &&
        macho
    ) {

        macho.style.background =
            "#9fc4ff";

    }

}


/* ===========================
SALVAR ANIMAL
=========================== */

function cadastrarAnimal(event) {

    event.preventDefault();

    const idade =
        Number(
            document.getElementById(
                "idade"
            ).value
        );

    if (idade < 0) {

        alert(
            "Idade inválida"
        );

        return;

    }

    const novoPet = {

        foto:
            fotoSelecionada
            ||
            "../img/user.png",

        nome:
            document.getElementById(
                "nome"
            ).value,

        idade:
            idade +
            " anos",

        especie:
            document.getElementById(
                "especie"
            ).value,

        sexo:
            sexoSelecionado,

        vacina:
            document.getElementById(
                "vacina"
            ).value,

        temperamento:
            document.getElementById(
                "temperamento"
            ).value,

        descricao:
            document.getElementById(
                "descricao"
            ).value,

        status:
            "Disponível"

    };

    let pets =
        JSON.parse(
            localStorage.getItem(
                "petsNovos"
            )
        ) || [];

    pets.push(
        novoPet
    );

    localStorage.setItem(
        "petsNovos",
        JSON.stringify(
            pets
        ));

    alert(
        "Animal cadastrado!"
    );

    window.location.href =
        "../html/pag-adocao.html";

}


/* ===========================
CARREGAMENTO
=========================== */

window.addEventListener(
    "load",
    function () {

        const tipo =
            localStorage.getItem(
                "tipoUsuario"
            );


        /* botão novo animal */

        const novo =
            document.getElementById(
                "novoAnimal"
            );

        if (novo) {

            novo.style.display =
                tipo === "veterinario"
                    ?
                    "flex"
                    :
                    "none";

        }


        /* esconder favoritos veterinário */

        if (
            tipo === "veterinario"
        ) {

            document
                .querySelectorAll(
                    ".card-footer"
                )
                .forEach(
                    el => {

                        el.style.display =
                            "none";

                    }

                );

        }

    }
);

function toggleSenha() {

    const senha = document.getElementById("senha");
    const icone = document.getElementById("iconeSenha");

    if (senha.type === "password") {
        senha.type = "text";
        icone.className = "bi bi-eye-slash";
    } else {
        senha.type = "password";
        icone.className = "bi bi-eye";
    }

}