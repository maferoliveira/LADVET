<<<<<<< HEAD
const API_URL = "http://localhost:3000";

function getToken() {
    return localStorage.getItem("token");
=======
function irParaHome() {
    window.location.href = "../html/identificacao.html";
>>>>>>> 8e80fe7c1749cba0b14c97802465c69631d0a2cc
}

function getUsuario() {
    try {
        return JSON.parse(localStorage.getItem("usuarioLogado"));
    } catch {
        return null;
    }
}

async function apiFetch(endpoint, options = {}) {
    const headers = {
        ...(options.body && { "Content-Type": "application/json" }),
        ...(options.headers || {})
    };

    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const resposta = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    let dados = {};
    try {
        dados = await resposta.json();
    } catch {}

    if (!resposta.ok) {
        throw new Error(dados.msg || dados.message || `Erro ${resposta.status}`);
    }

    return dados;
}

function irParaHome() { window.location.href = "../html/identificacao.html"; }
function selecionar(tipo) {
    localStorage.setItem("tipoUsuario", tipo);
    window.location.href = tipo === "veterinario"
        ? "../html/login-veterinario.html"
        : "../html/login.html";
}
function voltarIdentificacao() { window.location.href = "../html/identificacao.html"; }
function irParaInicio() { window.location.href = "../html/identificacao.html"; }
function irParaCadastro() { window.location.href = "../html/cadastro.html"; }
function voltarLogin() { window.location.href = "../html/login.html"; }
function irParaHomeSistema() { window.location.href = "../html/pag-adocao.html"; }

<<<<<<< HEAD
async function entrarSistema(event) {
=======
function irParaCadastro() {
    window.location.href = "../html/cadastro.html";
}

function voltarLogin() {
    window.location.href = "../html/login.html";
}

function irParaHomeSistema() {
    window.location.href = "../html/home.html";
}

function entrarSistema(event) {
    if (event) event.preventDefault();
    window.location.href = "../html/pag-adocao.html";
}

function entrarVeterinario(event) {
>>>>>>> 8e80fe7c1749cba0b14c97802465c69631d0a2cc
    if (event) event.preventDefault();

    const form = event?.target;
    const inputs = form?.querySelectorAll("input");
    const email = form?.querySelector('input[type="email"]')?.value;
    const senha = form?.querySelector('input[type="password"]')?.value;

    try {
        const dados = await apiFetch("/usuario/login", {
            method: "POST",
            body: JSON.stringify({ email, senha })
        });

        localStorage.setItem("token", dados.token);
        localStorage.setItem("usuarioLogado", JSON.stringify(dados.usuario));
        localStorage.setItem("tipoUsuario", dados.usuario.tipo_usuario === "CLINICA" ? "veterinario" : "adotante");

        window.location.href = "../html/pag-adocao.html";
    } catch (erro) {
        alert(erro.message);
    }
}

<<<<<<< HEAD
async function entrarVeterinario(event) {
    if (event) event.preventDefault();
    await entrarSistema(event);
}

async function criarConta(event) {
    event.preventDefault();

    const dados = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        cidade: document.getElementById("cidade").value,
        cep: document.getElementById("cep").value,
        endereco: document.getElementById("endereco").value,
        bairro: document.getElementById("bairro").value,
        numero: document.getElementById("número").value,
        residencia: document.getElementById("residencia").value,
        espaco: document.getElementById("espaco").value,
        rotina: document.getElementById("rotina").value,
        senha: document.getElementById("senha").value,
        tipo_usuario: "ADOTANTE"
    };

    try {
        const usuario = await apiFetch("/usuario/cadastrar", {
            method: "POST",
            body: JSON.stringify(dados)
        });

        alert("Conta criada com sucesso! 🐾");
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        window.location.href = "../html/login.html";
    } catch (erro) {
        alert(erro.message);
    }
}

function buscarCEP() {
    const cep = document.getElementById("cep")?.value.replace(/\D/g, "");
    if (!cep || cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(r => r.json())
        .then(data => {
            if (data.erro) return;
            document.getElementById("endereco").value = data.logradouro || "";
            document.getElementById("cidade").value = data.localidade || "";
            document.getElementById("bairro").value = data.bairro || "";
        })
        .catch(() => {});
}

=======
>>>>>>> 8e80fe7c1749cba0b14c97802465c69631d0a2cc
function favoritar(elemento, event) {
    if (event) event.stopPropagation();
    const nome = elemento.closest(".pet")?.dataset.pet;
    if (!nome) return;

<<<<<<< HEAD
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.includes(String(nome))) {
        favoritos = favoritos.filter(p => p !== String(nome));
=======
    const tipo = localStorage.getItem("tipoUsuario");

    if (tipo === "veterinario") return;

    const card = elemento.closest(".pet");

    if (!card) return;

    const nome = card.dataset.pet;

    let favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.includes(nome)) {

        favoritos = favoritos.filter(
            p => p !== nome
        );

>>>>>>> 8e80fe7c1749cba0b14c97802465c69631d0a2cc
        elemento.innerHTML = "♡";
        elemento.classList.remove("ativo");

    } else {
<<<<<<< HEAD
        favoritos.push(String(nome));
=======

        favoritos.push(nome);

>>>>>>> 8e80fe7c1749cba0b14c97802465c69631d0a2cc
        elemento.innerHTML = "♥";
        elemento.classList.add("ativo");
    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );
}

<<<<<<< HEAD
function abrirPet(id) {
    localStorage.setItem("petSelecionado", id);
    window.location.href = "../html/pet.html";
}

function abrirPerfil() { window.location.href = "../html/perfil.html"; }
function abrirFavoritos() { window.location.href = "../html/favoritos.html"; }
function abrirMinhasSolicitacoes() { window.location.href = "../html/minhas-solicitacoes.html"; }
function abrirContatos() { window.location.href = "../html/contatos.html"; }
function abrirHistoria() { window.location.href = "../html/historia.html"; }
function abrirConfiguracoes() { window.location.href = "../html/configuracoes.html"; }
function abrirCadastroAnimal() { window.location.href = "../html/cadastro-animal.html"; }
function abrirSolicitacoes() { window.location.href = "../html/solicitacao-clinica.html"; }
=======
function abrirPet(nome) {
    localStorage.setItem("petSelecionado", nome);
    window.location.href = "../html/pet.html";
}

function abrirPerfil() {
    window.location.href = "../html/perfil.html";
}

function abrirFavoritos() {
    window.location.href = "../html/favoritos.html";
}

function abrirMinhasSolicitacoes() {
    window.location.href = "../html/minhas-solicitacoes.html";
}

function abrirContatos() {
    window.location.href = "../html/contatos.html";
}

function abrirHistoria() {
    window.location.href = "../html/historia.html";
}

function abrirConfiguracoes() {
    window.location.href = "../html/configuracoes.html";
}

function abrirCadastroAnimal() {
    window.location.href = "../html/cadastro-animal.html";
}

function abrirSolicitacoes() {
    window.location.href = "../html/solicitacao-clinica.html";
}

>>>>>>> 8e80fe7c1749cba0b14c97802465c69631d0a2cc

let sexoSelecionado = "";
let fotoSelecionada = "";


function mostrarPreview(event) {

    const arquivo = event.target.files[0];

    if (!arquivo) return;

    const leitor = new FileReader();
<<<<<<< HEAD
    leitor.onload = e => {
        fotoSelecionada = e.target.result;
        const nome = document.getElementById("nomeFoto");
        const preview = document.getElementById("previewFoto");
        if (nome) nome.innerHTML = arquivo.name;
=======

    leitor.onload = function (e) {

        fotoSelecionada = e.target.result;

        const nome =
            document.getElementById("nomeFoto");

        const preview =
            document.getElementById("previewFoto");

        if (nome) {
            nome.innerHTML = arquivo.name;
        }

>>>>>>> 8e80fe7c1749cba0b14c97802465c69631d0a2cc
        if (preview) {
            preview.src = fotoSelecionada;
            preview.style.display = "block";
        }
    };

    leitor.readAsDataURL(arquivo);
}

<<<<<<< HEAD
function selecionarSexo(sexo) {
    sexoSelecionado = sexo;
    const femea = document.getElementById("btnFemea");
    const macho = document.getElementById("btnMacho");
    if (femea) femea.style.background = "#ddd";
    if (macho) macho.style.background = "#ddd";
    if (sexo === "Fêmea" && femea) femea.style.background = "#f6bfd8";
    if (sexo === "Macho" && macho) macho.style.background = "#9fc4ff";
}

async function cadastrarAnimal(event) {
    event.preventDefault();
=======

function selecionarSexo(sexo) {

    sexoSelecionado = sexo;

    const femea =
        document.getElementById("btnFemea");

    const macho =
        document.getElementById("btnMacho");

    if (femea) {
        femea.style.background = "#ddd";
    }

    if (macho) {
        macho.style.background = "#ddd";
    }

    if (sexo === "Fêmea" && femea) {
        femea.style.background = "#f6bfd8";
    }

    if (sexo === "Macho" && macho) {
        macho.style.background = "#9fc4ff";
    }
}


function cadastrarAnimal(event) {

    event.preventDefault();

    const idade =
        Number(document.getElementById("idade").value);
>>>>>>> 8e80fe7c1749cba0b14c97802465c69631d0a2cc

    if (!getToken()) {
        alert("Faça login como clínica para cadastrar animais.");
        window.location.href = "../html/login-veterinario.html";
        return;
    }

    const idade = Number(document.getElementById("idade").value);
    if (idade < 0) {
        alert("Idade inválida");
        return;
    }

<<<<<<< HEAD
    const dados = {
        nome: document.getElementById("nome").value,
        idade,
        especie: document.getElementById("especie").value,
        sexo: sexoSelecionado,
        temperamento: document.getElementById("temperamento").value,
        foto: fotoSelecionada || ""
    };

    try {
        await apiFetch("/animal/cadastrar", {
            method: "POST",
            body: JSON.stringify(dados)
        });

        alert("Animal cadastrado com sucesso! 🐾");
        window.location.href = "../html/pag-adocao.html";
    } catch (erro) {
        alert(erro.message);
    }
}

=======
    const novoPet = {

        foto:
            fotoSelecionada ||
            "../img/user.png",

        nome:
            document.getElementById("nome").value,

        idade:
            idade + " anos",

        especie:
            document.getElementById("especie").value,

        sexo:
            sexoSelecionado,

        vacina:
            document.getElementById("vacina").value,

        temperamento:
            document.getElementById("temperamento").value,

        descricao:
            document.getElementById("descricao").value
    };

    let pets =
        JSON.parse(
            localStorage.getItem("petsNovos")
        ) || [];

    pets.push(novoPet);

    localStorage.setItem(
        "petsNovos",
        JSON.stringify(pets)
    );

    alert("Animal cadastrado!");

    window.location.href =
        "../html/pag-adocao.html";
}


>>>>>>> 8e80fe7c1749cba0b14c97802465c69631d0a2cc
function trocarFoto(event) {

    const arquivo = event.target.files[0];

    if (!arquivo) return;
    const leitor = new FileReader();
<<<<<<< HEAD
    leitor.onload = e => {
        const preview = document.getElementById("preview");
        if (preview) preview.src = e.target.result;
=======

    leitor.onload = function (e) {

        const preview =
            document.getElementById("preview");

        if (preview) {
            preview.src = e.target.result;
        }
>>>>>>> 8e80fe7c1749cba0b14c97802465c69631d0a2cc
    };

    leitor.readAsDataURL(arquivo);
}

<<<<<<< HEAD
async function salvarConfiguracoes() {
    const usuario = getUsuario();
    if (!usuario) return;

    try {
        const atualizado = await apiFetch(`/usuario/atualizar/${usuario.id}`, {
            method: "PUT",
            body: JSON.stringify({})
        });
        localStorage.setItem("usuarioLogado", JSON.stringify(atualizado));
        alert("Alterações salvas!");
        window.location.href = "../html/perfil.html";
    } catch (erro) {
        alert(erro.message);
    }
}

function toggleSenha() {
    const senha = document.getElementById("senha");
    const icone = document.getElementById("iconeSenha");
    if (!senha) return;

    senha.type = senha.type === "password" ? "text" : "password";
    if (icone) icone.className = senha.type === "password" ? "bi bi-eye" : "bi bi-eye-slash";
}

function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoUsuario");
    window.location.href = "../html/identificacao.html";
}
=======

function salvarConfiguracoes() {

    alert("Alterações salvas!");

    window.location.href =
        "../html/perfil.html";
}


function toggleSenha() {

    const senha =
        document.getElementById("senha");

    const icone =
        document.getElementById("iconeSenha");

    if (!senha) return;

    if (senha.type === "password") {

        senha.type = "text";

        if (icone) {
            icone.className = "bi bi-eye-slash";
        }

    } else {

        senha.type = "password";

        if (icone) {
            icone.className = "bi bi-eye";
        }
    }
}


function abrirModal() {

    if (document.getElementById("modalTel1")) {

        document.getElementById("modalTel1").value =
            document.getElementById("tel1").value;

        document.getElementById("modalMail1").value =
            document.getElementById("mail1").value;

        document.getElementById("modalTel2").value =
            document.getElementById("tel2").value;

        document.getElementById("modalMail2").value =
            document.getElementById("mail2").value;

        document.getElementById("modalTel3").value =
            document.getElementById("tel3").value;

        document.getElementById("modalMail3").value =
            document.getElementById("mail3").value;
    }

    document
        .getElementById("modalEditar")
        .classList.add("ativo");
}


function fecharModal() {

    document
        .getElementById("modalEditar")
        .classList.remove("ativo");
}


function salvarDadosModal(event) {

    event.preventDefault();

    const dadosContatos = {

        tel1:
            document.getElementById("modalTel1").value,

        mail1:
            document.getElementById("modalMail1").value,

        tel2:
            document.getElementById("modalTel2").value,

        mail2:
            document.getElementById("modalMail2").value,

        tel3:
            document.getElementById("modalTel3").value,

        mail3:
            document.getElementById("modalMail3").value
    };

    document.getElementById("tel1").value =
        dadosContatos.tel1;

    document.getElementById("mail1").value =
        dadosContatos.mail1;

    document.getElementById("tel2").value =
        dadosContatos.tel2;

    document.getElementById("mail2").value =
        dadosContatos.mail2;

    document.getElementById("tel3").value =
        dadosContatos.tel3;

    document.getElementById("mail3").value =
        dadosContatos.mail3;

    localStorage.setItem(
        "dadosContatos",
        JSON.stringify(dadosContatos)
    );

    fecharModal();

    alert("Contatos atualizados com sucesso!");
}


window.addEventListener("load", function () {

    const tipo =
        localStorage.getItem("tipoUsuario");

    const salvos =
        JSON.parse(
            localStorage.getItem("dadosContatos")
        );

    if (
        salvos &&
        document.getElementById("tel1")
    ) {

        document.getElementById("tel1").value =
            salvos.tel1;

        document.getElementById("mail1").value =
            salvos.mail1;

        document.getElementById("tel2").value =
            salvos.tel2;

        document.getElementById("mail2").value =
            salvos.mail2;

        document.getElementById("tel3").value =
            salvos.tel3;

        document.getElementById("mail3").value =
            salvos.mail3;
    }

});


// VOLTAR PÁGINA

function voltarPagina() {

    window.history.back();

}

function criarConta(event) {

    event.preventDefault();

    const usuario = {

        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,

        cep: document.getElementById("cep").value,
        endereco: document.getElementById("endereco").value,
        cidade: document.getElementById("cidade").value,
        bairro: document.getElementById("bairro").value,

        residencia: document.getElementById("residencia").value,
        espaco: document.getElementById("espaco").value,
        experiencia: document.getElementById("experiencia").value,
        rotina: document.getElementById("rotina").value

    };

    localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuario)
    );

    window.location.href =
        "../html/pag-adocao.html";
}


// VOLTAR PARA ADOÇÃO

function voltarAdocao() {

    window.location.href =
        "../html/pag-adocao.html";

}


// BUSCAR CEP

function buscarCEP() {

    const campoCEP =
        document.getElementById("cep");

    if (!campoCEP) return;

    let cep =
        campoCEP.value.replace(/\D/g, "");


    if (cep.length !== 8) {

        alert("CEP inválido");

        return;
    }


    fetch(`https://viacep.com.br/ws/${cep}/json/`)

        .then(response => response.json())

        .then(dados => {

            if (dados.erro) {

                alert("CEP não encontrado");

                return;
            }


            const endereco =
                document.getElementById("endereco");

            const bairro =
                document.getElementById("bairro");

            const cidade =
                document.getElementById("cidade");


            if (endereco) {

                endereco.value =
                    dados.logradouro || "";

            }


            if (bairro) {

                bairro.value =
                    dados.bairro || "";

            }


            if (cidade) {

                cidade.value =
                    dados.localidade || "";

            }

        })

        .catch(erro => {

            console.error(
                "Erro ao buscar CEP:",
                erro
            );

            alert(
                "Não foi possível consultar o CEP."
            );

        });

}
>>>>>>> 8e80fe7c1749cba0b14c97802465c69631d0a2cc
