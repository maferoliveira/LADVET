
async function carregarPerfil() {

    if (!protegerPagina()) {
        return;
    }

    const usuario = getUsuario();

    if (!usuario || !usuario.id) {
        console.error("Usuário não encontrado ou sem ID.");
        return;
    }

    try {
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

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify({
                ...usuario,
                ...perfil
            })
        );

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
    }
}

async function salvarConfiguracoes(event) {

    event.preventDefault();

    if (!protegerPagina()) {
        return;
    }

    const usuario = getUsuario();

    if (!usuario || !usuario.id) {
        alert("Não foi possível identificar o usuário.");
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

        const resposta = await apiFetch(`/usuario/atualizar/${usuario.id}`, {

            method: "PUT",

            body: JSON.stringify(dados)

        });

        const usuarioAtualizado = {
            ...usuario,
            ...(resposta.usuario || resposta)
        };

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuarioAtualizado)
        );

        alert("Perfil atualizado com sucesso!");

        // Recarrega os dados atualizados
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