/* ==========================
NAVEGAÇÃO
========================== */

function irParaHome() {
    window.location.href = "../html/identificacao.html";
}

function selecionar(tipo) {
    localStorage.setItem("tipoUsuario", tipo);

    if (tipo === "veterinario") {
        window.location.href = "../html/login-veterinario.html";
    } else {
        window.location.href = "../html/login.html";
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


/* ==========================
LOGIN
========================== */

function entrarSistema(event) {
    if (event) event.preventDefault();
    window.location.href = "../html/pag-adocao.html";
}

function entrarVeterinario(event) {
    if (event) event.preventDefault();
    window.location.href = "../html/pag-adocao.html";
}


/* ==========================
FAVORITOS
========================== */

function favoritar(elemento, event) {
    if (event) event.stopPropagation();

    const tipo = localStorage.getItem("tipoUsuario");
    if (tipo === "veterinario") return;

    const card = elemento.closest(".pet");
    if (!card) return;

    const nome = card.dataset.pet;
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.includes(nome)) {
        favoritos = favoritos.filter(p => p !== nome);
        elemento.innerHTML = "♡";
        elemento.classList.remove("ativo");
    } else {
        favoritos.push(nome);
        elemento.innerHTML = "♥";
        elemento.classList.add("ativo");
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}


/* ==========================
PET
========================== */

function abrirPet(nome) {
    localStorage.setItem("petSelecionado", nome);
    window.location.href = "../html/pet.html";
}


/* ==========================
PERFIL
========================== */

function abrirPerfil() {
    window.location.href = "../html/perfil.html";
}

function abrirFavoritos() {
    window.location.href = "../html/favoritos.html";
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


/* ==========================
CADASTRO ANIMAL
========================== */

function abrirCadastroAnimal() {
    window.location.href = "../html/cadastro-animal.html";
}


/* ==========================
UPLOAD FOTO
========================== */

let sexoSelecionado = "";
let fotoSelecionada = "";

function mostrarPreview(event) {
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = function (e) {
        fotoSelecionada = e.target.result;
        const nome = document.getElementById("nomeFoto");
        const preview = document.getElementById("previewFoto");

        if (nome) nome.innerHTML = arquivo.name;
        if (preview) {
            preview.src = fotoSelecionada;
            preview.style.display = "block";
        }
    };
    leitor.readAsDataURL(arquivo);
}


/* ==========================
SEXO
========================== */

function selecionarSexo(sexo) {
    sexoSelecionado = sexo;
    const femea = document.getElementById("btnFemea");
    const macho = document.getElementById("btnMacho");

    if (femea) femea.style.background = "#ddd";
    if (macho) macho.style.background = "#ddd";

    if (sexo === "Fêmea" && femea) {
        femea.style.background = "#f6bfd8";
    }
    if (sexo === "Macho" && macho) {
        macho.style.background = "#9fc4ff";
    }
}


/* ==========================
CADASTRAR
========================== */

function cadastrarAnimal(event) {
    event.preventDefault();
    const idade = Number(document.getElementById("idade").value);

    if (idade < 0) {
        alert("Idade inválida");
        return;
    }

    const novoPet = {
        foto: fotoSelecionada || "../img/user.png",
        nome: document.getElementById("nome").value,
        idade: idade + " anos",
        especie: document.getElementById("especie").value,
        sexo: sexoSelecionado,
        vacina: document.getElementById("vacina").value,
        temperamento: document.getElementById("temperamento").value,
        descricao: document.getElementById("descricao").value
    };

    let pets = JSON.parse(localStorage.getItem("petsNovos")) || [];
    pets.push(novoPet);
    localStorage.setItem("petsNovos", JSON.stringify(pets));

    alert("Animal cadastrado!");
    window.location.href = "../html/pag-adocao.html";
}


/* ==========================
CONFIGURAÇÕES
========================== */

function trocarFoto(event) {
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = function (e) {
        const preview = document.getElementById("preview");
        if (preview) preview.src = e.target.result;
    };
    leitor.readAsDataURL(arquivo);
}

function salvarConfiguracoes() {
    alert("Alterações salvas!");
    window.location.href = "../html/perfil.html";
}


/* ==========================
SENHA
========================== */

function toggleSenha() {
    const senha = document.getElementById("senha");
    const icone = document.getElementById("iconeSenha");

    if (!senha) return;

    if (senha.type === "password") {
        senha.type = "text";
        if (icone) icone.className = "bi bi-eye-slash";
    } else {
        senha.type = "password";
        if (icone) icone.className = "bi bi-eye";
    }
}


/* ==========================
CONTATOS (MODAL DE EDIÇÃO)
========================== */

// Abre a aba de atualizar trazendo os valores que estão na tela no momento
function abrirModal() {
    if (document.getElementById('modalTel1')) {
        document.getElementById('modalTel1').value = document.getElementById('tel1').value;
        document.getElementById('modalMail1').value = document.getElementById('mail1').value;
        
        document.getElementById('modalTel2').value = document.getElementById('tel2').value;
        document.getElementById('modalMail2').value = document.getElementById('mail2').value;
        
        document.getElementById('modalTel3').value = document.getElementById('tel3').value;
        document.getElementById('modalMail3').value = document.getElementById('mail3').value;
    }
    document.getElementById('modalEditar').classList.add('ativo');
}

// Fecha a aba de atualizar
function fecharModal() {
    document.getElementById('modalEditar').classList.remove('ativo');
}

// Salva as alterações na tela e também no armazenamento local (localStorage)
function salvarDadosModal(event) {
    event.preventDefault();

    const dadosContatos = {
        tel1: document.getElementById('modalTel1').value,
        mail1: document.getElementById('modalMail1').value,
        tel2: document.getElementById('modalTel2').value,
        mail2: document.getElementById('modalMail2').value,
        tel3: document.getElementById('modalTel3').value,
        mail3: document.getElementById('modalMail3').value
    };

    // Atualiza visualmente os inputs da página
    document.getElementById('tel1').value = dadosContatos.tel1;
    document.getElementById('mail1').value = dadosContatos.mail1;
    document.getElementById('tel2').value = dadosContatos.tel2;
    document.getElementById('mail2').value = dadosContatos.mail2;
    document.getElementById('tel3').value = dadosContatos.tel3;
    document.getElementById('mail3').value = dadosContatos.mail3;

    // Grava as alterações permanentemente no banco do navegador
    localStorage.setItem("dadosContatos", JSON.stringify(dadosContatos));

    fecharModal();
    alert("Contatos atualizados com sucesso!");
}


/* ==========================
LOAD (GERENCIAMENTO DE CARREGAMENTO)
========================== */

window.addEventListener("load", function () {
    // 1. Lógica existente do seu projeto: Verifica tipo de usuário
    const tipo = localStorage.getItem("tipoUsuario");
    
    // 2. Nova lógica: Carrega os contatos editados salvos no localStorage (se existirem)
    const salvos = JSON.parse(localStorage.getItem("dadosContatos"));
    
    // Verifica se estamos na página de contatos antes de tentar preencher os elementos
    if (salvos && document.getElementById('tel1')) {
        document.getElementById('tel1').value = salvos.tel1;
        document.getElementById('mail1').value = salvos.mail1;
        document.getElementById('tel2').value = salvos.tel2;
        document.getElementById('mail2').value = salvos.mail2;
        document.getElementById('tel3').value = salvos.tel3;
        document.getElementById('mail3').value = salvos.mail3;
    }
});
