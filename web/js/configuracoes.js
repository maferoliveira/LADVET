
const API_CONFIG = window.LADVET_API_URL || "http://localhost:3000";

function usuarioAtual() {
    try {
        return JSON.parse(localStorage.getItem("usuarioLogado"));
    } catch {
        return null;
    }
}

function tokenAtual() {
    return localStorage.getItem("token");
}

function mostrarMensagem(texto, erro = false) {
    let elemento = document.getElementById("mensagem");

    if (!elemento) {
        elemento = document.createElement("p");
        elemento.id = "mensagem";
        elemento.className = "mensagem";

        document.getElementById("formSenha").appendChild(elemento);
    }

    elemento.textContent = texto;
    elemento.className = erro
        ? "mensagem erro"
        : "mensagem sucesso";
}

async function requisicao(endpoint, opcoes = {}) {
    const resposta = await fetch(`${API_CONFIG}${endpoint}`, {
        ...opcoes,
        headers: {
            ...(opcoes.body ? {
                "Content-Type": "application/json"
            } : {}),
            Authorization: `Bearer ${tokenAtual()}`,
            ...(opcoes.headers || {})
        }
    });

    const dados = await resposta.json().catch(() => ({}));

    if (!resposta.ok) {
        throw new Error(
            dados.msg || "Não foi possível concluir a operação."
        );
    }

    return dados;
}

// VERIFICAR LOGIN
function verificarUsuario() {
    const usuario = usuarioAtual();

    if (!usuario || !usuario.id || !tokenAtual()) {
        window.location.href = "identificacao.html";
    }
}

// ALTERAR SENHA
async function alterarSenha(evento) {
    evento.preventDefault();

    const usuario = usuarioAtual();

    if (!usuario?.id) {
        mostrarMensagem("Não foi possível identificar sua conta.", true);
        return;
    }

    const senhaAtual = document.getElementById("senhaAtual").value;
    const novaSenha = document.getElementById("novaSenha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (novaSenha.length < 8) {
        mostrarMensagem("A nova senha deve ter pelo menos 8 caracteres.", true);
        return;
    }

    if (novaSenha !== confirmarSenha) {
        mostrarMensagem("As senhas não coincidem.", true);
        return;
    }

    if (senhaAtual === novaSenha) {
        mostrarMensagem("A nova senha deve ser diferente da atual.", true);
        return;
    }

    const botao = document.getElementById("btnSalvar");
    botao.disabled = true;

    try {
        await requisicao(`/usuario/alterar-senha/${usuario.id}`, {
            method: "PUT",
            body: JSON.stringify({
                senhaAtual: senhaAtual,
                novaSenha: novaSenha
            })
        });

        document.getElementById("formSenha").reset();

        mostrarMensagem("Senha alterada com sucesso!");

    } catch (erro) {
        console.error("Erro ao alterar senha:", erro);
        mostrarMensagem(erro.message, true);

    } finally {
        botao.disabled = false;
    }
}

// SAIR DA CONTA
function sairDaConta() {
    const confirmar = confirm("Deseja realmente sair da sua conta?");

    if (!confirmar) return;

    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("token");

    window.location.href = "identificacao.html";
}

window.alterarSenha = alterarSenha;
window.sairDaConta = sairDaConta;

document.addEventListener("DOMContentLoaded", verificarUsuario);
