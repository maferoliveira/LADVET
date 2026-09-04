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
    const headers = { ...(options.headers || {}) };

    if (options.body && !(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    const token = getToken();

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const resposta = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    let dados = {};

    try {
        dados = await resposta.json();
    } catch {}

    if (!resposta.ok) {
        throw new Error(
            dados.msg ||
            dados.message ||
            `Erro ${resposta.status}`
        );
    }

    return dados;
}


/* Login */

async function entrarSistema(event) {
    if (event) event.preventDefault();

    const email = document.getElementById("emailLogin")?.value.trim().toLowerCase();
    const senha = document.getElementById("senhaLogin")?.value;

    if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    try {
        const dados = await apiFetch("/usuario/login", {
            method: "POST",
            body: JSON.stringify({ email, senha })
        });

        if (dados.usuario.tipo_usuario !== "ADOTANTE") {
            alert("Esta conta não é uma conta de adotante.");
            return;
        }

        localStorage.setItem("token", dados.token);
        localStorage.setItem("usuarioLogado", JSON.stringify(dados.usuario));
        localStorage.setItem("tipoUsuario", "adotante");

        window.location.href = "pag-adocao.html";
    } catch (erro) {
        alert(erro.message);
    }
}


async function entrarVeterinario(event) {
    if (event) event.preventDefault();

    const email = document.getElementById("emailVeterinario")?.value.trim().toLowerCase();
    const senha = document.getElementById("senhaVeterinario")?.value;

    if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    try {
        const dados = await apiFetch("/usuario/login", {
            method: "POST",
            body: JSON.stringify({ email, senha })
        });

        if (dados.usuario.tipo_usuario !== "CLINICA") {
            alert("Esta conta não é uma conta de clínica.");
            return;
        }

        localStorage.setItem("token", dados.token);
        localStorage.setItem("usuarioLogado", JSON.stringify(dados.usuario));
        localStorage.setItem("tipoUsuario", "veterinario");

        window.location.href = "pag-adocao.html";
    } catch (erro) {
        alert(erro.message);
    }
}


/* Identificação */

function selecionar(tipo) {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogado");

    localStorage.setItem("tipoUsuario", tipo);

    if (tipo === "adotante") {
        window.location.href = "login.html";
    } else {
        window.location.href = "login-veterinario.html";
    }
}


/* Cadastro */

async function criarConta(event) {
    if (event) event.preventDefault();

    const dados = {
        nome: document.getElementById("nome")?.value.trim(),
        email: document.getElementById("email")?.value.trim().toLowerCase(),
        telefone: document.getElementById("telefone")?.value.trim(),
        senha: document.getElementById("senha")?.value,
        cep: document.getElementById("cep")?.value.trim(),
        endereco: document.getElementById("endereco")?.value.trim(),
        cidade: document.getElementById("cidade")?.value.trim(),
        bairro: document.getElementById("bairro")?.value.trim(),
        numero: document.getElementById("número")?.value.trim(),
        residencia: document.getElementById("residencia")?.value,
        espaco: document.getElementById("espaco")?.value.trim(),
        rotina: document.getElementById("rotina")?.value.trim(),
        tipo_usuario: "ADOTANTE"
    };

    const experiencia = document.getElementById("experiencia")?.value;

    if (experiencia) {
        dados.espaco += `\nExperiência: ${experiencia}`;
    }

    if (!dados.nome || !dados.email || !dados.telefone || !dados.senha || !dados.cidade) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    try {
        await apiFetch("/usuario/cadastrar", {
            method: "POST",
            body: JSON.stringify(dados)
        });

        alert("Conta criada com sucesso!");
        window.location.href = "login.html";
    } catch (erro) {
        alert(erro.message);
    }
}


async function criarContaVeterinario(event) {
    if (event) event.preventDefault();

    const dados = {
        nome: document.getElementById("nomeVeterinarioCadastro")?.value.trim(),
        email: document.getElementById("emailVeterinarioCadastro")?.value.trim().toLowerCase(),
        telefone: document.getElementById("telefoneVeterinarioCadastro")?.value.trim(),
        cidade: document.getElementById("cidadeVeterinarioCadastro")?.value.trim(),
        senha: document.getElementById("senhaVeterinarioCadastro")?.value,
        crmv: document.getElementById("crmvVeterinarioCadastro")?.value.trim(),
        tipo_usuario: "CLINICA"
    };

    if (!dados.nome || !dados.email || !dados.senha || !dados.crmv) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    try {
        await apiFetch("/usuario/cadastrar", {
            method: "POST",
            body: JSON.stringify(dados)
        });

        alert("Conta da clínica criada com sucesso!");
        window.location.href = "login-veterinario.html";
    } catch (erro) {
        alert(erro.message);
    }
}


/* Proteção */

function protegerPagina(tipoPermitido = null) {
    const usuario = getUsuario();
    const token = getToken();

    if (!usuario || !token) {
        window.location.href = "identificacao.html";
        return false;
    }

    if (tipoPermitido) {
        const tipoAtual =
            usuario.tipo_usuario === "CLINICA"
                ? "veterinario"
                : "adotante";

        if (tipoAtual !== tipoPermitido) {
            alert("Você não possui permissão.");
            window.location.href = "pag-adocao.html";
            return false;
        }
    }

    return true;
}


/* Navegação */

function irParaHome() {
    window.location.href = "identificacao.html";
}

function irParaInicio() {
    window.location.href = "index.html";
}

function voltarIdentificacao() {
    window.location.href = "identificacao.html";
}

function irParaCadastro() {
    window.location.href = "cadastro.html";
}

function irParaCadastroVeterinario() {
    window.location.href = "cadastro-veterinario.html";
}

function voltarLogin() {
    const tipo = localStorage.getItem("tipoUsuario");

    window.location.href =
        tipo === "veterinario"
            ? "login-veterinario.html"
            : "login.html";
}

function irParaHomeSistema() {
    window.location.href = "pag-adocao.html";
}

function voltarAdocao() {
    window.location.href = "pag-adocao.html";
}

function voltarPagina() {
    window.history.back();
}


/* Perfil */

function abrirPerfil() {
    window.location.href = "perfil.html";
}

function abrirMinhasSolicitacoes() {
    window.location.href = "minhas-solicitacoes.html";
}

function abrirSolicitacoes() {
    window.location.href = "solicitacao-clinica.html";
}

function abrirCadastroAnimal() {
    if (!protegerPagina("veterinario")) return;
    window.location.href = "cadastro-animal.html";
}

function abrirConfiguracoes() {
    window.location.href = "configuracoes.html";
}

function abrirContatos() {
    window.location.href = "contatos.html";
}

function abrirEditarContatos() {
    window.location.href = "contatos.html";
}

function abrirHistoria() {
    window.location.href = "historia.html";
}

function abrirFavoritos() {
    window.location.href = "favoritos.html";
}


/* Sair */

function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoUsuario");

    window.location.href = "identificacao.html";
}


/* Senha */

function toggleSenha() {
    const senha = document.getElementById("senha");

    if (!senha) return;

    senha.type =
        senha.type === "password"
            ? "text"
            : "password";
}


/* CEP */

function buscarCEP() {
    const campo = document.getElementById("cep");

    if (!campo) return;

    const cep = campo.value.replace(/\D/g, "");

    if (cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.erro) return;

            const endereco = document.getElementById("endereco");
            const bairro = document.getElementById("bairro");
            const cidade = document.getElementById("cidade");

            if (endereco) endereco.value = dados.logradouro || "";
            if (bairro) bairro.value = dados.bairro || "";
            if (cidade) cidade.value = dados.localidade || "";
        })
        .catch(() => {});
}


/* Cadastro de animal */

let sexoSelecionado = "";

function selecionarSexo(sexo) {
    sexoSelecionado = sexo;

    document.querySelectorAll("[data-sexo]").forEach(botao => {
        botao.classList.remove("selecionado");

        if (botao.dataset.sexo === sexo) {
            botao.classList.add("selecionado");
        }
    });
}

async function cadastrarAnimal(event) {

    if (event) {
        event.preventDefault();
    }

    if (!protegerPagina("veterinario")) {
        return;
    }

    const nome = document.getElementById("nome")?.value.trim();
    const especie = document.getElementById("especie")?.value.trim();
    const raca = document.getElementById("raca")?.value.trim();
    const idadeValor = document.getElementById("idade")?.value;
    const porte = document.getElementById("porte")?.value.trim();
    const temperamento =
        document.getElementById("temperamento")?.value.trim();

    if (!nome || !especie || idadeValor === "" || !sexoSelecionado) {
        alert("Preencha nome, espécie, idade e sexo.");
        return;
    }

    const idade = Number(idadeValor);

    if (isNaN(idade) || idade < 0) {
        alert("Informe uma idade válida.");
        return;
    }

    const arquivo = document.getElementById("foto")?.files?.[0];

    let foto = "";

    try {

        if (arquivo) {
            foto = await converterImagem(arquivo);
        }

        const dados = {
            nome: nome,
            especie: especie,
            raca: raca || "Não informado",
            idade: idade,
            sexo: sexoSelecionado,
            porte: porte || "Não informado",
            temperamento: temperamento || "",
            foto: foto,
            status: "DISPONIVEL"
        };

        console.log("Dados enviados:", dados);

        await apiFetch("/animal/cadastrar", {
            method: "POST",
            body: JSON.stringify(dados)
        });

        alert("Animal cadastrado com sucesso!");

        window.location.href = "pag-adocao.html";

    } catch (erro) {

        console.error("Erro ao cadastrar animal:", erro);

        alert(erro.message);
    }
}

function converterImagem(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();

        leitor.onload = () => resolve(leitor.result);
        leitor.onerror = reject;

        leitor.readAsDataURL(arquivo);
    });
}


/* Pets */

function abrirPet(id) {
    localStorage.setItem("petSelecionado", String(id));
    window.location.href = `pet.html?id=${id}`;
}

function favoritar(elemento, event) {
    if (event) event.stopPropagation();

    const pet = elemento?.closest(".pet")?.dataset.pet;

    if (!pet) return;

    let favoritos = JSON.parse(
        localStorage.getItem("favoritos") || "[]"
    );

    const id = Number(pet);

    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(item => item !== id);
        elemento.textContent = "♡";
    } else {
        favoritos.push(id);
        elemento.textContent = "♥";
    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );
}


/* Preview */

function mostrarPreview(event) {
    const arquivo = event?.target?.files?.[0];

    if (!arquivo) return;

    const preview =
        document.getElementById("preview") ||
        document.getElementById("previewFoto");

    if (!preview) return;

    const leitor = new FileReader();

    leitor.onload = () => {
        preview.src = leitor.result;
        preview.style.display = "block";
    };

    leitor.readAsDataURL(arquivo);
}

function trocarFoto(event) {
    mostrarPreview(event);
}


/* Modal */

function abrirModal() {
    const modal =
        document.getElementById("modal") ||
        document.getElementById("modalEditar");

    if (modal) {
        modal.style.display = "flex";
        modal.classList.add("ativo");
    }
}

function fecharModal() {
    const modal =
        document.getElementById("modal") ||
        document.getElementById("modalEditar");

    if (modal) {
        modal.style.display = "none";
        modal.classList.remove("ativo");
    }
}

function salvarDadosModal(event) {
    if (event) event.preventDefault();

    fecharModal();
    alert("Dados atualizados com sucesso!");
}


/* Usuário */

function obterUsuarioLogado() {
    return getUsuario();
}

function usuarioEstaLogado() {
    return !!getToken() && !!getUsuario();
}


/* Funções globais usadas pelo HTML */

window.getToken = getToken;
window.getUsuario = getUsuario;
window.apiFetch = apiFetch;

window.selecionar = selecionar;

window.entrarSistema = entrarSistema;
window.entrarVeterinario = entrarVeterinario;

window.criarConta = criarConta;
window.criarContaVeterinario = criarContaVeterinario;

window.protegerPagina = protegerPagina;

window.irParaHome = irParaHome;
window.irParaInicio = irParaInicio;
window.voltarIdentificacao = voltarIdentificacao;
window.irParaCadastro = irParaCadastro;
window.irParaCadastroVeterinario = irParaCadastroVeterinario;
window.voltarLogin = voltarLogin;
window.irParaHomeSistema = irParaHomeSistema;
window.voltarAdocao = voltarAdocao;
window.voltarPagina = voltarPagina;

window.abrirPerfil = abrirPerfil;
window.abrirMinhasSolicitacoes = abrirMinhasSolicitacoes;
window.abrirSolicitacoes = abrirSolicitacoes;
window.abrirCadastroAnimal = abrirCadastroAnimal;
window.abrirConfiguracoes = abrirConfiguracoes;
window.abrirContatos = abrirContatos;
window.abrirEditarContatos = abrirEditarContatos;
window.abrirHistoria = abrirHistoria;
window.abrirFavoritos = abrirFavoritos;

window.sair = sair;

window.toggleSenha = toggleSenha;

window.buscarCEP = buscarCEP;

window.selecionarSexo = selecionarSexo;
window.cadastrarAnimal = cadastrarAnimal;

window.abrirPet = abrirPet;
window.favoritar = favoritar;

window.mostrarPreview = mostrarPreview;
window.trocarFoto = trocarFoto;

window.abrirModal = abrirModal;
window.fecharModal = fecharModal;
window.salvarDadosModal = salvarDadosModal;

window.obterUsuarioLogado = obterUsuarioLogado;
window.usuarioEstaLogado = usuarioEstaLogado;