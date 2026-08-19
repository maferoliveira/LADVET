async function carregarPerfil() {
    const usuario = getUsuario();
    if (!usuario) {
        window.location.href = "login.html";
        return;
    }

    try {
        const dados = await apiFetch(`/usuario/buscar/${usuario.id}`);

        const preencher = (id, valor) => {
            const el = document.getElementById(id);
            if (el) el.textContent = valor || "-";
        };

        preencher("nomePerfil", dados.nome);
        preencher("emailPerfil", dados.email);
        preencher("telefonePerfil", dados.telefone);
        preencher("cepPerfil", dados.cep);
        preencher("enderecoPerfil", dados.endereco);
        preencher("bairroPerfil", dados.bairro);
        preencher("cidadePerfil", dados.cidade);
        preencher("residenciaPerfil", dados.residencia);
        preencher("espacoPerfil", dados.espaco);
        preencher("experienciaPerfil", dados.experiencia);
        preencher("rotinaPerfil", dados.rotina);

        const tipo = dados.tipo_usuario;
        preencher("tipoPerfil", tipo === "CLINICA" ? "Veterinário" : "Adotante");

        const clinica = tipo === "CLINICA";
        document.getElementById("minhasSolicitacoes").style.display = clinica ? "none" : "flex";
        document.getElementById("cadastroAnimais").style.display = clinica ? "flex" : "none";
        document.getElementById("solicitacoes").style.display = clinica ? "flex" : "none";

        localStorage.setItem("usuarioLogado", JSON.stringify(dados));
        localStorage.setItem("tipoUsuario", clinica ? "veterinario" : "adotante");
    } catch (erro) {
        alert(erro.message);
    }
}

carregarPerfil();
