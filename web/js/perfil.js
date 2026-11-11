
const FOTO_PADRAO = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150">
    <rect width="150" height="150" fill="#f4dddd"/>
    <circle cx="75" cy="55" r="27" fill="#d18f91"/>
    <path d="M25 145c3-35 23-53 50-53s47 18 50 53" fill="#d18f91"/>
</svg>
`);

const campoFotoPerfil = document.getElementById("fotoPerfil");
const previewFotoPerfil = document.getElementById("previewFotoPerfil");
const botaoRemoverFoto = document.getElementById("removerFotoPerfil");

let fotoPerfilSelecionada = null;
let removerFoto = false;

function obterChaveFoto() {
    const usuario = getUsuario();

    if (!usuario) return "fotoPerfil";

    const identificador = usuario.id || usuario.email || "usuario";

    return "fotoPerfil_" + identificador;
}

function carregarFotoPerfil(fotoServidor = null) {
    const fotoSalva = localStorage.getItem(obterChaveFoto());

    if (fotoSalva === "REMOVIDA") {
        previewFotoPerfil.src = FOTO_PADRAO;
        return;
    }

    previewFotoPerfil.src =
        fotoSalva ||
        fotoServidor ||
        FOTO_PADRAO;
}

/* SELECIONAR E VISUALIZAR FOTO */

campoFotoPerfil.addEventListener("change", function () {
    const arquivo = this.files[0];

    if (!arquivo) return;

    const formatosPermitidos = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (!formatosPermitidos.includes(arquivo.type)) {
        alert("Escolha uma imagem JPG, PNG ou WEBP.");
        this.value = "";
        return;
    }

    if (arquivo.size > 2 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 2 MB.");
        this.value = "";
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function (evento) {
        const imagem = new Image();

        imagem.onload = function () {
            const canvas = document.createElement("canvas");
            const limite = 500;

            let largura = imagem.width;
            let altura = imagem.height;

            if (largura > altura && largura > limite) {
                altura = Math.round(altura * limite / largura);
                largura = limite;
            } else if (altura > limite) {
                largura = Math.round(largura * limite / altura);
                altura = limite;
            }

            canvas.width = largura;
            canvas.height = altura;

            const contexto = canvas.getContext("2d");

            contexto.drawImage(imagem, 0, 0, largura, altura);

            fotoPerfilSelecionada = canvas.toDataURL("image/jpeg", 0.8);

            previewFotoPerfil.src = fotoPerfilSelecionada;

            removerFoto = false;
        };

        imagem.src = evento.target.result;
    };

    leitor.readAsDataURL(arquivo);
});

/* REMOVER FOTO */

botaoRemoverFoto.addEventListener("click", function () {
    fotoPerfilSelecionada = null;
    removerFoto = true;

    campoFotoPerfil.value = "";

    previewFotoPerfil.src = FOTO_PADRAO;
});

/* CARREGAR PERFIL */

async function carregarPerfil() {
    if (!protegerPagina()) return;

    const usuario = getUsuario();

    if (!usuario) return;

    try {
        // ROTA CORRIGIDA: busca pelo ID do usuário
        const dados = await apiFetch(`/usuario/buscar/${usuario.id}`);

        const perfil = dados.usuario || dados;

        document.getElementById("nomePerfil").value = perfil.nome || "";
        document.getElementById("emailPerfil").value = perfil.email || "";
        document.getElementById("telefonePerfil").value = perfil.telefone || "";
        document.getElementById("cidadePerfil").value = perfil.cidade || "";
        document.getElementById("cepPerfil").value = perfil.cep || "";
        document.getElementById("enderecoPerfil").value = perfil.endereco || "";
        document.getElementById("bairroPerfil").value = perfil.bairro || "";
        document.getElementById("numeroPerfil").value = perfil.numero || "";
        document.getElementById("residenciaPerfil").value = perfil.residencia || "";
        document.getElementById("espacoPerfil").value = perfil.espaco || "";
        document.getElementById("experienciaPerfil").value = perfil.experiencia || "";
        document.getElementById("rotinaPerfil").value = perfil.rotina || "";
        document.getElementById("crmvPerfil").value = perfil.crmv || "";

        carregarFotoPerfil(perfil.fotoPerfil || null);

    } catch (erro) {
        console.error("Erro ao carregar perfil:", erro);

        document.getElementById("nomePerfil").value = usuario.nome || "";
        document.getElementById("emailPerfil").value = usuario.email || "";
        document.getElementById("telefonePerfil").value = usuario.telefone || "";
        document.getElementById("cidadePerfil").value = usuario.cidade || "";
        document.getElementById("cepPerfil").value = usuario.cep || "";
        document.getElementById("enderecoPerfil").value = usuario.endereco || "";
        document.getElementById("bairroPerfil").value = usuario.bairro || "";
        document.getElementById("numeroPerfil").value = usuario.numero || "";
        document.getElementById("residenciaPerfil").value = usuario.residencia || "";
        document.getElementById("espacoPerfil").value = usuario.espaco || "";
        document.getElementById("experienciaPerfil").value = usuario.experiencia || "";
        document.getElementById("rotinaPerfil").value = usuario.rotina || "";
        document.getElementById("crmvPerfil").value = usuario.crmv || "";

        carregarFotoPerfil(usuario.fotoPerfil || null);
    }
}

/* SALVAR ALTERAÇÕES */

async function salvarConfiguracoes(event) {
    event.preventDefault();

    if (!protegerPagina()) return;

    const usuarioAtual = getUsuario();

    if (!usuarioAtual || !usuarioAtual.id) {
        alert("Não foi possível identificar o usuário. Faça login novamente.");
        return;
    }

    const dados = {
        nome: document.getElementById("nomePerfil").value.trim(),
        telefone: document.getElementById("telefonePerfil").value.trim(),
        cidade: document.getElementById("cidadePerfil").value.trim(),
        cep: document.getElementById("cepPerfil").value.trim(),
        endereco: document.getElementById("enderecoPerfil").value.trim(),
        bairro: document.getElementById("bairroPerfil").value.trim(),
        numero: document.getElementById("numeroPerfil").value.trim(),
        residencia: document.getElementById("residenciaPerfil").value.trim(),
        espaco: document.getElementById("espacoPerfil").value.trim(),
        experiencia: document.getElementById("experienciaPerfil").value.trim(),
        rotina: document.getElementById("rotinaPerfil").value.trim()
    };

    if (!dados.nome) {
        alert("Informe seu nome.");
        return;
    }

    try {
        // ROTA CORRIGIDA: atualiza pelo ID do usuário
        const resposta = await apiFetch(`/usuario/atualizar/${usuarioAtual.id}`, {
            method: "PUT",
            body: JSON.stringify(dados)
        });

        const usuarioAtualizado = {
            ...usuarioAtual,
            ...(resposta.usuario || dados)
        };

        // Salvar foto localmente
        if (fotoPerfilSelecionada) {
            localStorage.setItem(obterChaveFoto(), fotoPerfilSelecionada);
            usuarioAtualizado.fotoPerfil = fotoPerfilSelecionada;
        } else if (removerFoto) {
            localStorage.setItem(obterChaveFoto(), "REMOVIDA");
            delete usuarioAtualizado.fotoPerfil;
        }

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuarioAtualizado)
        );

        alert("Perfil atualizado com sucesso!");

        fotoPerfilSelecionada = null;
        removerFoto = false;

        await carregarPerfil();

    } catch (erro) {
        console.error("Erro ao salvar perfil:", erro);

        alert(
            erro.message ||
            "Não foi possível atualizar o perfil."
        );
    }
}

carregarPerfil();
