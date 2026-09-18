async function carregarPerfil() {
    if (!protegerPagina()) {
        return;
    }

    const usuario = getUsuario();

    if (!usuario) {
        return;
    }

    try {
        const dados = await apiFetch("/usuario/perfil");
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
        document.getElementById("rotinaPerfil").value = perfil.rotina || "";
        document.getElementById("crmvPerfil").value = perfil.crmv || "";

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
        document.getElementById("rotinaPerfil").value = usuario.rotina || "";
        document.getElementById("crmvPerfil").value = usuario.crmv || "";
    }
}

async function salvarConfiguracoes(event) {
    event.preventDefault();

    if (!protegerPagina()) {
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
        rotina: document.getElementById("rotinaPerfil").value.trim()
    };

    if (!dados.nome) {
        alert("Informe seu nome.");
        return;
    }

    try {
        const resposta = await apiFetch("/usuario/atualizar", {
            method: "PUT",
            body: JSON.stringify(dados)
        });

        const usuarioAtual = getUsuario();

        const usuarioAtualizado = resposta.usuario || {
            ...usuarioAtual,
            ...dados
        };

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuarioAtualizado)
        );

        alert("Perfil atualizado com sucesso!");

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