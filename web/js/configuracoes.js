let fotoPerfilSelecionada = null;

function usuarioAtualizadoLocal(usuario) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
}

function mostrarFotoConfiguracao(foto) {
    const preview = document.getElementById("preview");
    if (!preview) return;

    preview.src = foto || "../img/userrosa.png";
}

async function carregarConfiguracoes() {
    if (!protegerPagina()) return;

    const usuarioLocal = getUsuario();
    if (!usuarioLocal || !usuarioLocal.id) {
        alert("Não foi possível identificar sua conta. Entre novamente.");
        window.location.href = "identificacao.html";
        return;
    }

    try {
        // Busca os dados atualizados no banco, inclusive a foto salva.
        const usuario = await apiFetch(`/usuario/buscar/${usuarioLocal.id}`);

        document.getElementById("nome").value = usuario.nome || "";
        document.getElementById("email").value = usuario.email || "";
        document.getElementById("telefone").value = usuario.telefone || "";

        usuarioAtualizadoLocal({ ...usuarioLocal, ...usuario });
        mostrarFotoConfiguracao(usuario.fotoPerfil);
    } catch (erro) {
        console.error("Erro ao carregar configurações:", erro);

        // Mantém a página utilizável com os dados que já estão no navegador.
        document.getElementById("nome").value = usuarioLocal.nome || "";
        document.getElementById("email").value = usuarioLocal.email || "";
        document.getElementById("telefone").value = usuarioLocal.telefone || "";
        mostrarFotoConfiguracao(usuarioLocal.fotoPerfil);
        alert(erro.message || "Não foi possível carregar os dados da conta.");
    }
}

function converterFotoPerfil(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();

        leitor.onload = () => {
            const imagem = new Image();

            imagem.onload = () => {
                const limite = 700;
                let largura = imagem.width;
                let altura = imagem.height;

                if (largura > altura && largura > limite) {
                    altura = Math.round(altura * limite / largura);
                    largura = limite;
                } else if (altura > limite) {
                    largura = Math.round(largura * limite / altura);
                    altura = limite;
                }

                const canvas = document.createElement("canvas");
                canvas.width = largura;
                canvas.height = altura;

                const contexto = canvas.getContext("2d");
                contexto.drawImage(imagem, 0, 0, largura, altura);

                // JPEG comprimido para evitar enviar arquivos enormes à API.
                resolve(canvas.toDataURL("image/jpeg", 0.82));
            };

            imagem.onerror = () => reject(new Error("Não foi possível abrir essa imagem."));
            imagem.src = leitor.result;
        };

        leitor.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
        leitor.readAsDataURL(arquivo);
    });
}

async function trocarFoto(event) {
    const arquivo = event?.target?.files?.[0];
    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
        alert("Selecione um arquivo de imagem.");
        event.target.value = "";
        return;
    }

    if (arquivo.size > 8 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 8 MB.");
        event.target.value = "";
        return;
    }

    try {
        fotoPerfilSelecionada = await converterFotoPerfil(arquivo);
        mostrarFotoConfiguracao(fotoPerfilSelecionada);
    } catch (erro) {
        console.error(erro);
        alert(erro.message || "Não foi possível carregar a imagem.");
        event.target.value = "";
    }
}

async function salvarConfiguracoes(event) {
    event.preventDefault();

    if (!protegerPagina()) return;

    const usuario = getUsuario();
    if (!usuario || !usuario.id) {
        alert("Sua sessão não foi identificada. Entre novamente.");
        return;
    }

    const dados = {
        nome: document.getElementById("nome").value.trim(),
        email: document.getElementById("email").value.trim().toLowerCase(),
        telefone: document.getElementById("telefone").value.trim()
    };

    if (!dados.nome || !dados.email) {
        alert("Preencha seu nome e email.");
        return;
    }

    // Só envia foto quando uma nova imagem foi escolhida.
    if (fotoPerfilSelecionada) {
        dados.fotoPerfil = fotoPerfilSelecionada;
    }

    const botao = document.getElementById("btnSalvar");
    botao.disabled = true;
    botao.textContent = "Salvando...";

    try {
        const resposta = await apiFetch(`/usuario/atualizar/${usuario.id}`, {
            method: "PUT",
            body: JSON.stringify(dados)
        });

        const usuarioAtualizado = {
            ...usuario,
            ...resposta
        };

        usuarioAtualizadoLocal(usuarioAtualizado);
        fotoPerfilSelecionada = null;

        alert("Configurações salvas com sucesso!");
        mostrarFotoConfiguracao(usuarioAtualizado.fotoPerfil);
    } catch (erro) {
        console.error("Erro ao salvar configurações:", erro);
        alert(erro.message || "Não foi possível salvar as alterações.");
    } finally {
        botao.disabled = false;
        botao.textContent = "Salvar alterações";
    }
}

window.trocarFoto = trocarFoto;
window.salvarConfiguracoes = salvarConfiguracoes;

document.addEventListener("DOMContentLoaded", carregarConfiguracoes);
