
const GOOGLE_CLIENT_ID = "665644644326-871i1u1jqv52tjbpt8k46b52eb3h6g7f.apps.googleusercontent.com";
const GOOGLE_API_URL = window.LADVET_API_URL || "http://localhost:3000";

let cadastroTokenGoogle = null;

// Identifica o tipo de usuário peconferila página
function obterTipoUsuario() {
    return document.getElementById("emailVeterinario")
        ? "CLINICA"
        : "ADOTANTE";
}

// Inicializa o botão do Google
function iniciarLoginGoogle() {
    const area = document.getElementById("googleLoginButton");

    if (!area) {
        console.error("Elemento googleLoginButton não encontrado.");
        return;
    }

    if (window.google?.accounts?.id) {
        configurarBotaoGoogle(area);
        return;
    }

    let tentativas = 0;

    const intervalo = setInterval(() => {
        tentativas++;

        if (window.google?.accounts?.id) {
            clearInterval(intervalo);
            configurarBotaoGoogle(area);
        } else if (tentativas >= 40) {
            clearInterval(intervalo);
            area.innerHTML = "<p>O Google não carregou. Verifique sua conexão.</p>";
        }
    }, 250);
}

// Configura o botão Google
function configurarBotaoGoogle(area) {
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: receberCredencialGoogle
    });

    google.accounts.id.renderButton(area, {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "continue_with",
        width: 280,
        locale: "pt-BR"
    });
}

// Recebe a credencial Google
async function receberCredencialGoogle(respostaGoogle) {
    try {
        if (!respostaGoogle?.credential) {
            throw new Error("Não foi possível obter a credencial do Google.");
        }

        const tipoUsuario = obterTipoUsuario();

        const resposta = await fetch(`${GOOGLE_API_URL}/usuario/login-google`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                credential: respostaGoogle.credential,
                tipo_usuario: tipoUsuario
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.msg || "Não foi possível entrar com Google.");
        }

        // Primeiro acesso
        if (dados.primeiroAcesso) {
            cadastroTokenGoogle = dados.cadastroToken;

            if (!cadastroTokenGoogle) {
                throw new Error("A API não retornou o token de cadastro.");
            }

            mostrarFormularioGoogle(dados.dadosGoogle, tipoUsuario);
            return;
        }

        // Conta já cadastrada
        if (!dados.token || !dados.usuario) {
            throw new Error("A API não retornou os dados esperados.");
        }

        if (dados.usuario.tipo_usuario !== tipoUsuario) {
            throw new Error("Esta conta pertence a outra categoria.");
        }

        salvarLogin(dados.token, dados.usuario);

    } catch (erro) {
        console.error("Erro no login Google:", erro);
        alert(erro.message || "Erro ao entrar com Google.");
    }
}

// Salva o login
function salvarLogin(token, usuario) {
    localStorage.setItem("token", token);

    localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuario)
    );

    if (usuario.tipo_usuario === "CLINICA" && !usuario.validado) {
        alert("Cadastro realizado! Sua conta está aguardando validação do CRMV.");
        return;
    }

    window.location.href = usuario.tipo_usuario === "CLINICA"
        ? "perfil.html"
        : "pag-adocao.html";
}

// Cria o formulário de primeiro acesso
function mostrarFormularioGoogle(dadosGoogle, tipoUsuario) {
    const formulario = document.getElementById("formularioGoogle");

    if (!formulario) {
        console.error("Elemento formularioGoogle não encontrado no HTML.");
        return;
    }

    const camposAdotante = tipoUsuario === "ADOTANTE"
        ? `
            <label>Tipo de residência</label>
            <input type="text" name="residencia" required
                placeholder="Ex.: casa ou apartamento">

            <label>Espaço disponível</label>
            <input type="text" name="espaco" required
                placeholder="Descreva o espaço">

            <label>Rotina</label>
            <textarea name="rotina" required
                placeholder="Conte um pouco sobre sua rotina"></textarea>

            <label>Experiência com animais</label>
            <textarea name="experiencia"
                placeholder="Conte sua experiência (opcional)"></textarea>
        `
        : `
            <label>CRMV</label>
            <input type="text" name="crmv" required
                placeholder="Informe seu CRMV">
        `;

    formulario.innerHTML = `
        <form id="formCadastroGoogle">

            <h2>Complete seu cadastro</h2>

            <p>Olá, ${escaparHTML(dadosGoogle.nome || "usuário")}!</p>

            <label>Nome</label>
            <input type="text"
                value="${escaparHTML(dadosGoogle.nome || "")}"
                disabled>

            <label>Email</label>
            <input type="email"
                value="${escaparHTML(dadosGoogle.email || "")}"
                disabled>

            <label>Telefone</label>
            <input type="tel" name="telefone"
                required placeholder="Seu telefone">

            <label>Cidade</label>
            <input type="text" name="cidade"
                required placeholder="Sua cidade">

            ${camposAdotante}

            <button type="submit" id="btnFinalizarGoogle">
                Finalizar cadastro
            </button>

            <p id="mensagemCadastroGoogle"></p>

        </form>
    `;

    // Estilização do formulário
    formulario.style.cssText = `
        width: 100%;
        max-width: 420px;
        box-sizing: border-box;
        margin: 20px auto 0;
        padding: 25px;
        border-radius: 0 0 15px 15px;
        background: #d39797;
        color: #fff;
        font-family: Arial, sans-serif;
    `;

    const formularioInterno = document.getElementById("formCadastroGoogle");

    formularioInterno.querySelectorAll("label").forEach(label => {
        label.style.cssText = `
            display: block;
            margin: 12px 0 6px;
            font-weight: bold;
        `;
    });

    formularioInterno.querySelectorAll("input, textarea").forEach(campo => {
        campo.style.cssText = `
            display: block;
            width: 100%;
            box-sizing: border-box;
            padding: 12px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
        `;
    });

    const botao = document.getElementById("btnFinalizarGoogle");

    botao.style.cssText = `
        width: 100%;
        padding: 14px;
        margin-top: 15px;
        border: none;
        border-radius: 8px;
        background: #7180a8;
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
    `;

    // Agora o formulário realmente recebe o evento de envio
    formularioInterno.addEventListener("submit", finalizarCadastroGoogle);

    formulario.scrollIntoView({ behavior: "smooth" });
}

// Protege os dados inseridos no HTML
function escaparHTML(valor) {
    return String(valor).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);
}

// Finaliza o cadastro na API
async function finalizarCadastroGoogle(evento) {
    evento.preventDefault();

    const formulario = evento.currentTarget;
    const mensagem = document.getElementById("mensagemCadastroGoogle");
    const botao = document.getElementById("btnFinalizarGoogle");

    const dadosFormulario = new FormData(formulario);
    const dados = Object.fromEntries(dadosFormulario.entries());

    botao.disabled = true;
    mensagem.textContent = "Finalizando cadastro...";

    try {
        const resposta = await fetch(
            `${GOOGLE_API_URL}/usuario/completar-cadastro-google`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cadastroTokenGoogle}`
                },
                body: JSON.stringify(dados)
            }
        );

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.msg || "Erro ao finalizar cadastro.");
        }

        cadastroTokenGoogle = null;

        salvarLogin(resultado.token, resultado.usuario);

    } catch (erro) {
        console.error("Erro ao finalizar cadastro Google:", erro);

        mensagem.textContent = erro.message;
        botao.disabled = false;
    }
}

document.addEventListener("DOMContentLoaded", iniciarLoginGoogle);
