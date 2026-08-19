const API_URL = "http://localhost:3000";

function getToken() {
    return localStorage.getItem("token");
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

async function entrarSistema(event) {
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

function favoritar(elemento, event) {
    if (event) event.stopPropagation();
    const nome = elemento.closest(".pet")?.dataset.pet;
    if (!nome) return;

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.includes(String(nome))) {
        favoritos = favoritos.filter(p => p !== String(nome));
        elemento.innerHTML = "♡";
        elemento.classList.remove("ativo");
    } else {
        favoritos.push(String(nome));
        elemento.innerHTML = "♥";
        elemento.classList.add("ativo");
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

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

let sexoSelecionado = "";
let fotoSelecionada = "";

function mostrarPreview(event) {
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = e => {
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

function trocarFoto(event) {
    const arquivo = event.target.files[0];
    if (!arquivo) return;
    const leitor = new FileReader();
    leitor.onload = e => {
        const preview = document.getElementById("preview");
        if (preview) preview.src = e.target.result;
    };
    leitor.readAsDataURL(arquivo);
}

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
