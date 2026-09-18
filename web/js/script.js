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
        ...(options.body ? { "Content-Type": "application/json" } : {}),
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
    } catch (_) {}

    if (!resposta.ok) {
        throw new Error(dados.msg || dados.message || `Erro ${resposta.status}`);
    }

    return dados;
}

function irParaHome() {
    window.location.href = "../html/identificacao.html";
}

function selecionar(tipo) {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("token");
    localStorage.removeItem("tipoUsuario");
    localStorage.setItem("tipoSelecionado", tipo);

    window.location.href = tipo === "veterinario"
        ? "../html/login-veterinario.html"
        : "../html/login.html";
}

function voltarIdentificacao() {
    window.location.href = "../html/identificacao.html";
}

function irParaInicio() {
    window.location.href = "../html/identificacao.html";
}

function irParaCadastro() {
    window.location.href = "../html/cadastro.html";
}

function irParaCadastroVeterinario() {
    window.location.href = "../html/cadastro-veterinario.html";
}

function voltarLogin() {
    window.location.href = "../html/login.html";
}

function irParaHomeSistema() {
    window.location.href = "../html/pag-adocao.html";
}

function obterUsuarioLogado() {
    return getUsuario();
}

function usuarioEstaLogado() {
    return !!getToken() && !!getUsuario();
}

function protegerPagina(tipoPermitido = null) {
    const usuario = getUsuario();
    const token = getToken();

    if (!usuario || !token) {
        alert("Você precisa fazer login para acessar o sistema.");
        window.location.href = "../html/identificacao.html";
        return false;
    }

    const tipo = usuario.tipo_usuario === "CLINICA" ? "veterinario" : "adotante";
    localStorage.setItem("tipoUsuario", tipo);

    if (tipoPermitido && tipo !== tipoPermitido) {
        alert("Você não tem permissão para acessar esta página.");
        window.location.href = "../html/pag-adocao.html";
        return false;
    }

    return true;
}

function sair() {
    ["token", "usuarioLogado", "tipoUsuario", "tipoSelecionado", "petSelecionado", "petParaAdocao"].forEach(chave => {
        localStorage.removeItem(chave);
    });

    window.location.href = "../html/identificacao.html";
}

async function entrarSistema(event) {
    if (event) event.preventDefault();

    const email = document.getElementById("emailLogin")?.value.trim().toLowerCase();
    const senha = document.getElementById("senhaLogin")?.value;

    try {
        const dados = await apiFetch("/usuario/login", {
            method: "POST",
            body: JSON.stringify({ email, senha })
        });

        if (dados.usuario.tipo_usuario !== "ADOTANTE") {
            throw new Error("Esta conta é de clínica. Use o login de veterinário.");
        }

        localStorage.setItem("token", dados.token);
        localStorage.setItem("usuarioLogado", JSON.stringify(dados.usuario));
        localStorage.setItem("tipoUsuario", "adotante");

        window.location.href = "../html/pag-adocao.html";
    } catch (erro) {
        alert(erro.message);
    }

    return false;
}

async function entrarVeterinario(event) {
    if (event) event.preventDefault();

    const email = document.getElementById("emailVeterinario")?.value.trim().toLowerCase();
    const senha = document.getElementById("senhaVeterinario")?.value;

    try {
        const dados = await apiFetch("/usuario/login", {
            method: "POST",
            body: JSON.stringify({ email, senha })
        });

        if (dados.usuario.tipo_usuario !== "CLINICA") {
            throw new Error("Esta conta é de adotante. Use o login de adotante.");
        }

        localStorage.setItem("token", dados.token);
        localStorage.setItem("usuarioLogado", JSON.stringify(dados.usuario));
        localStorage.setItem("tipoUsuario", "veterinario");

        window.location.href = "../html/pag-adocao.html";
    } catch (erro) {
        alert(erro.message);
    }

    return false;
}

async function criarConta(event) {
    if (event) event.preventDefault();

    const dados = {
        nome: document.getElementById("nome")?.value.trim(),
        email: document.getElementById("email")?.value.trim().toLowerCase(),
        telefone: document.getElementById("telefone")?.value.trim(),
        cidade: document.getElementById("cidade")?.value.trim(),
        cep: document.getElementById("cep")?.value.trim(),
        endereco: document.getElementById("endereco")?.value.trim(),
        bairro: document.getElementById("bairro")?.value.trim(),
        numero: document.getElementById("número")?.value.trim(),
        residencia: document.getElementById("residencia")?.value,
        espaco: document.getElementById("espaco")?.value.trim(),
        experiencia: document.getElementById("experiencia")?.value,
        rotina: document.getElementById("rotina")?.value.trim(),
        senha: document.getElementById("senha")?.value,
        tipo_usuario: "ADOTANTE"
    };

    try {
        await apiFetch("/usuario/cadastrar", {
            method: "POST",
            body: JSON.stringify(dados)
        });

        alert("Conta criada com sucesso! 🐾");
        window.location.href = "../html/login.html";
    } catch (erro) {
        alert(erro.message);
    }

    return false;
}

async function criarContaVeterinario(event) {
    if (event) event.preventDefault();

    const dados = {
        nome: document.getElementById("nomeVeterinarioCadastro")?.value.trim(),
        email: document.getElementById("emailVeterinarioCadastro")?.value.trim().toLowerCase(),
        telefone: document.getElementById("telefoneVeterinarioCadastro")?.value.trim(),
        cidade: document.getElementById("cidadeVeterinarioCadastro")?.value.trim(),
        crmv: document.getElementById("crmvVeterinarioCadastro")?.value.trim(),
        senha: document.getElementById("senhaVeterinarioCadastro")?.value,
        tipo_usuario: "CLINICA"
    };

    try {
        await apiFetch("/usuario/cadastrar", {
            method: "POST",
            body: JSON.stringify(dados)
        });

        alert("Conta da clínica criada com sucesso! 🐾");
        window.location.href = "../html/login-veterinario.html";
    } catch (erro) {
        alert(erro.message);
    }

    return false;
}

function buscarCEP() {
    const campoCEP = document.getElementById("cep");
    if (!campoCEP) return;

    const cep = campoCEP.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.erro) return;
            document.getElementById("endereco").value = dados.logradouro || "";
            document.getElementById("cidade").value = dados.localidade || "";
            document.getElementById("bairro").value = dados.bairro || "";
        })
        .catch(() => {});
}

function toggleSenha() {
    const senha = document.getElementById("senha");
    const icone = document.getElementById("iconeSenha");
    if (!senha) return;

    senha.type = senha.type === "password" ? "text" : "password";
    if (icone) {
        icone.className = senha.type === "password" ? "bi bi-eye" : "bi bi-eye-slash";
    }
}

function abrirPet(id) {
    localStorage.setItem("petSelecionado", String(id));
    window.location.href = "../html/pet.html";
}

function abrirPerfil() {
    if (!usuarioEstaLogado()) {
        alert("Você precisa fazer login.");
        window.location.href = "../html/identificacao.html";
        return;
    }
    window.location.href = "../html/perfil.html";
}

function abrirFavoritos() {
    if (localStorage.getItem("tipoUsuario") === "veterinario") return;
    window.location.href = "../html/favoritos.html";
}

function abrirMinhasSolicitacoes() {
    if (localStorage.getItem("tipoUsuario") === "veterinario") return;
    window.location.href = "../html/minhas-solicitacoes.html";
}

function abrirContatos() { window.location.href = "../html/contatos.html"; }
function abrirEditarContatos() {
    if (localStorage.getItem("tipoUsuario") === "veterinario") {
        window.location.href = "../html/contatos.html";
    }
}
function abrirHistoria() { window.location.href = "../html/historia.html"; }
function abrirConfiguracoes() { window.location.href = "../html/configuracoes.html"; }

function abrirCadastroAnimal() {
    if (localStorage.getItem("tipoUsuario") !== "veterinario") return;
    window.location.href = "../html/cadastro-animal.html";
}

function abrirSolicitacoes() {
    if (localStorage.getItem("tipoUsuario") !== "veterinario") return;
    window.location.href = "../html/solicitacao-clinica.html";
}

function favoritar(elemento, event) {
    if (event) event.stopPropagation();
    if (localStorage.getItem("tipoUsuario") === "veterinario") return;

    const id = elemento.closest(".pet")?.dataset.pet;
    if (!id) return;

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.map(String);

    if (favoritos.includes(String(id))) {
        favoritos = favoritos.filter(item => item !== String(id));
        elemento.innerHTML = "♡";
        elemento.classList.remove("ativo");
    } else {
        favoritos.push(String(id));
        elemento.innerHTML = "♥";
        elemento.classList.add("ativo");
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function mostrarPreview(event) {
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = e => {
        window.fotoSelecionada = e.target.result;
        const preview = document.getElementById("previewFoto");
        const nome = document.getElementById("nomeFoto");
        if (preview) {
            preview.src = e.target.result;
            preview.style.display = "block";
        }
        if (nome) nome.textContent = arquivo.name;
    };
    leitor.readAsDataURL(arquivo);
}

function selecionarSexo(sexo) {
    window.sexoSelecionado = sexo;
    const femea = document.getElementById("btnFemea");
    const macho = document.getElementById("btnMacho");
    if (femea) femea.style.background = "#ddd";
    if (macho) macho.style.background = "#ddd";
    if (sexo === "Fêmea" && femea) femea.style.background = "#f6bfd8";
    if (sexo === "Macho" && macho) macho.style.background = "#9fc4ff";
}

async function cadastrarAnimal(event) {
    if (event) event.preventDefault();

    if (!protegerPagina("veterinario")) return false;

    const idade = Number(document.getElementById("idade")?.value);
    if (Number.isNaN(idade) || idade < 0) {
        alert("Idade inválida.");
        return false;
    }

    const dados = {
        nome: document.getElementById("nome")?.value.trim(),
        idade,
        especie: document.getElementById("especie")?.value.trim(),
        raca: document.getElementById("raca")?.value.trim() || undefined,
        porte: document.getElementById("porte")?.value.trim() || undefined,
        sexo: window.sexoSelecionado || "",
        temperamento: document.getElementById("temperamento")?.value.trim(),
        foto: window.fotoSelecionada || ""
    };

    if (!dados.nome || !dados.especie || !dados.sexo) {
        alert("Preencha nome, espécie e sexo.");
        return false;
    }

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

    return false;
}

window.addEventListener("load", () => {
    const tipo = localStorage.getItem("tipoUsuario");
    const novoAnimal = document.getElementById("novoAnimal");
    if (novoAnimal) novoAnimal.style.display = tipo === "veterinario" ? "block" : "none";
});
