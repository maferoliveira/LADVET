function irParaHome() {
    window.location.href = "../html/identificacao.html";
}

function selecionar(tipo) {
    
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoUsuario");
    localStorage.setItem("tipoSelecionado", tipo);

    if (tipo === "veterinario") {
        window.location.href = "../html/login-veterinario.html";
    } else {
        window.location.href = "../html/login.html";
    }
}

function voltarIdentificacao() {
    window.location.href = "../html/identificacao.html";
}

function irParaInicio() {
    window.location.href = "../html/index.html";
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
    try {
        return JSON.parse(localStorage.getItem("usuarioLogado"));
    } catch (e) {
        return null;
    }
}

function usuarioEstaLogado() {
    return !!obterUsuarioLogado();
}

function protegerPagina(tipoPermitido = null) {
    const usuario = obterUsuarioLogado();
    const tipo = localStorage.getItem("tipoUsuario");

    if (!usuario || !tipo) {
        alert("Você precisa fazer login para acessar o sistema.");
        window.location.href = "../html/identificacao.html";
        return false;
    }

    if (tipoPermitido && tipo !== tipoPermitido) {
        window.location.href = "../html/pag-adocao.html";
        return false;
    }

    return true;
}

function sair() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("tipoSelecionado");
    localStorage.removeItem("petSelecionado");
    localStorage.removeItem("petParaAdocao");

    window.location.href = "../html/identificacao.html";
}

function entrarSistema(event) {
    if (event) event.preventDefault();

    const emailCampo = document.getElementById("emailLogin");
    const senhaCampo = document.getElementById("senhaLogin");

    const email = emailCampo
        ? emailCampo.value.trim().toLowerCase()
        : "";
    const senha = senhaCampo ? senhaCampo.value : "";

    const usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(
        u =>
            u.email === email &&
            u.senha === senha &&
            u.tipo === "adotante"
    );

    if (!usuario) {
        alert("Email ou senha incorretos, ou conta de adotante não cadastrada.");
        return false;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    localStorage.setItem("tipoUsuario", "adotante");

    window.location.href = "../html/pag-adocao.html";
    return true;
}

function entrarVeterinario(event) {
    if (event) event.preventDefault();

    const emailCampo = document.getElementById("emailVeterinario");
    const senhaCampo = document.getElementById("senhaVeterinario");

    const email = emailCampo
        ? emailCampo.value.trim().toLowerCase()
        : "";
    const senha = senhaCampo ? senhaCampo.value : "";

    const veterinarios =
        JSON.parse(localStorage.getItem("veterinarios")) || [];

    const veterinario = veterinarios.find(
        vet =>
            vet.email === email &&
            vet.senha === senha &&
            vet.tipo === "veterinario"
    );

    if (!veterinario) {
        alert("Email ou senha incorretos, ou conta de veterinário não cadastrada.");
        return false;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(veterinario));
    localStorage.setItem("tipoUsuario", "veterinario");

    window.location.href = "../html/pag-adocao.html";
    return true;
}

function criarContaVeterinario(event) {
    if (event) event.preventDefault();

    const nome = document.getElementById("nomeVeterinarioCadastro").value.trim();
    const email = document.getElementById("emailVeterinarioCadastro").value.trim().toLowerCase();
    const senha = document.getElementById("senhaVeterinarioCadastro").value;

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    let veterinarios =
        JSON.parse(localStorage.getItem("veterinarios")) || [];

    if (veterinarios.some(v => v.email === email)) {
        alert("Já existe um veterinário cadastrado com este email.");
        return;
    }

    const veterinario = {
        nome,
        email,
        senha,
        telefone: document.getElementById("telefoneVeterinarioCadastro")?.value.trim() || "",
        tipo: "veterinario"
    };

    veterinarios.push(veterinario);

    localStorage.setItem(
        "veterinarios",
        JSON.stringify(veterinarios)
    );

    localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(veterinario)
    );

    localStorage.setItem("tipoUsuario", "veterinario");

    alert("Conta de veterinário criada com sucesso!");

    window.location.href = "../html/pag-adocao.html";
}

function criarConta(event) {
    if (event) event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const telefone = document.getElementById("telefone").value.trim();
    const senha = document.getElementById("senha").value;

    if (!senha) {
        alert("Informe uma senha.");
        return;
    }

    const novoUsuario = {
        nome,
        email,
        senha,
        telefone,
        cep: document.getElementById("cep").value.trim(),
        endereco: document.getElementById("endereco").value.trim(),
        cidade: document.getElementById("cidade").value.trim(),
        bairro: document.getElementById("bairro").value.trim(),
        numero: document.getElementById("número").value.trim(),
        residencia: document.getElementById("residencia").value,
        espaco: document.getElementById("espaco").value.trim(),
        experiencia: document.getElementById("experiencia").value,
        rotina: document.getElementById("rotina").value.trim(),
        tipo: "adotante"
    };

    let usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some(usuario => usuario.email === email)) {
        alert("Já existe uma conta cadastrada com este email.");
        return;
    }

    usuarios.push(novoUsuario);

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(novoUsuario)
    );

    localStorage.setItem("tipoUsuario", "adotante");

    alert("Conta criada com sucesso!");

    window.location.href = "../html/pag-adocao.html";
}

function abrirPet(nome) {
    localStorage.setItem("petSelecionado", nome);
    window.location.href = "../html/pet.html";
}

function voltarAdocao() {
    window.location.href = "../html/pag-adocao.html";
}

function favoritar(elemento, event) {
    if (event) event.stopPropagation();

    if (localStorage.getItem("tipoUsuario") === "veterinario") return;

    const card = elemento.closest(".pet");
    if (!card) return;

    const nome = card.dataset.pet;
    if (!nome) return;

    let favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.includes(nome)) {
        favoritos = favoritos.filter(pet => pet !== nome);
        elemento.innerHTML = "♡";
        elemento.classList.remove("ativo");
    } else {
        favoritos.push(nome);
        elemento.innerHTML = "♥";
        elemento.classList.add("ativo");
    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );
}

function abrirFavoritos() {
    if (localStorage.getItem("tipoUsuario") === "veterinario") return;
    window.location.href = "../html/favoritos.html";
}

function abrirPerfil() {
    if (!usuarioEstaLogado()) {
        alert("Você precisa fazer login.");
        window.location.href = "../html/identificacao.html";
        return;
    }

    window.location.href = "../html/perfil.html";
}

function abrirMinhasSolicitacoes() {
    if (localStorage.getItem("tipoUsuario") === "veterinario") return;
    window.location.href = "../html/minhas-solicitacoes.html";
}

function abrirContatos() {
    window.location.href = "../html/contatos.html";
}

function abrirHistoria() {
    window.location.href = "../html/historia.html";
}

function abrirConfiguracoes() {
    window.location.href = "../html/configuracoes.html";
}

function abrirCadastroAnimal() {
    if (localStorage.getItem("tipoUsuario") !== "veterinario") return;
    window.location.href = "../html/cadastro-animal.html";
}

function abrirSolicitacoes() {
    if (localStorage.getItem("tipoUsuario") !== "veterinario") return;
    window.location.href = "../html/solicitacao-clinica.html";
}

function abrirEditarContatos() {
    if (localStorage.getItem("tipoUsuario") !== "veterinario") return;
    window.location.href = "../html/contatos.html";
}
let sexoSelecionado = "";
let fotoSelecionada = "";

function mostrarPreview(event) {
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = function (e) {
        fotoSelecionada = e.target.result;

        const nome = document.getElementById("nomeFoto");
        const preview = document.getElementById("previewFoto");

        if (nome) nome.textContent = arquivo.name;

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

function listaDeTexto(id) {
    const campo = document.getElementById(id);
    if (!campo) return [];

    return campo.value
        .split(",")
        .map(v => v.trim())
        .filter(Boolean);
}

function cadastrarAnimal(event) {
    event.preventDefault();

    if (localStorage.getItem("tipoUsuario") !== "veterinario") {
        alert("Somente veterinários podem cadastrar animais.");
        return;
    }

    const idade = Number(document.getElementById("idade").value);

    if (idade < 0) {
        alert("Idade inválida.");
        return;
    }

    const novoPet = {
        foto: fotoSelecionada || "../img/user.png",
        nome: document.getElementById("nome").value.trim(),
        idade: idade + (idade === 1 ? " ano" : " anos"),
        especie: document.getElementById("especie").value.trim(),
        sexo: sexoSelecionado,
        vacinasTomadas: listaDeTexto("vacinasTomadas"),
        vacinasNecessarias: listaDeTexto("vacinasNecessarias"),
        temperamento: document.getElementById("temperamento").value.trim(),
        descricao: document.getElementById("descricao").value.trim(),
        status: "Disponível"
    };

    if (!novoPet.nome || !novoPet.especie || !sexoSelecionado) {
        alert("Preencha nome, espécie e sexo.");
        return;
    }

    let pets =
        JSON.parse(localStorage.getItem("petsNovos")) || [];

    if (pets.some(p => p.nome.toLowerCase() === novoPet.nome.toLowerCase())) {
        alert("Já existe um animal com esse nome.");
        return;
    }

    pets.push(novoPet);

    localStorage.setItem(
        "petsNovos",
        JSON.stringify(pets)
    );

    // Também cria a carteira imediatamente.
    let carteiras =
        JSON.parse(localStorage.getItem("carteirasVacinas")) || {};

    carteiras[novoPet.nome] = {
        tomadas: novoPet.vacinasTomadas,
        necessarias: novoPet.vacinasNecessarias
    };

    localStorage.setItem(
        "carteirasVacinas",
        JSON.stringify(carteiras)
    );

    alert("Animal cadastrado!");
    window.location.href = "../html/pag-adocao.html";
}

function trocarFoto(event) {
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = function (e) {
        const preview = document.getElementById("preview");
        if (preview) preview.src = e.target.result;
    };

    leitor.readAsDataURL(arquivo);
}

function salvarConfiguracoes() {
    alert("Alterações salvas!");
    window.location.href = "../html/perfil.html";
}

function toggleSenha() {
    const senha = document.getElementById("senha");
    const icone = document.getElementById("iconeSenha");

    if (!senha) return;

    if (senha.type === "password") {
        senha.type = "text";
        if (icone) icone.className = "bi bi-eye-slash";
    } else {
        senha.type = "password";
        if (icone) icone.className = "bi bi-eye";
    }
}

function abrirModal() {
    if (localStorage.getItem("tipoUsuario") !== "veterinario") return;

    const modal = document.getElementById("modalEditar");
    if (!modal) return;

    const ids = [
        ["modalTel1", "tel1"],
        ["modalMail1", "mail1"],
        ["modalTel2", "tel2"],
        ["modalMail2", "mail2"],
        ["modalTel3", "tel3"],
        ["modalMail3", "mail3"]
    ];

    ids.forEach(([modalId, inputId]) => {
        const modalInput = document.getElementById(modalId);
        const input = document.getElementById(inputId);
        if (modalInput && input) modalInput.value = input.value;
    });

    modal.classList.add("ativo");
}

function fecharModal() {
    const modal = document.getElementById("modalEditar");
    if (modal) modal.classList.remove("ativo");
}

function salvarDadosModal(event) {
    event.preventDefault();

    if (localStorage.getItem("tipoUsuario") !== "veterinario") return;

    const dadosContatos = {};

    ["tel1", "mail1", "tel2", "mail2", "tel3", "mail3"].forEach(id => {
        const campo = document.getElementById("modal" + id.charAt(0).toUpperCase() + id.slice(1));
        if (campo) dadosContatos[id] = campo.value;
    });

    ["tel1", "mail1", "tel2", "mail2", "tel3", "mail3"].forEach(id => {
        const campo = document.getElementById(id);
        if (campo && dadosContatos[id] !== undefined) {
            campo.value = dadosContatos[id];
        }
    });

    localStorage.setItem(
        "dadosContatos",
        JSON.stringify(dadosContatos)
    );

    fecharModal();
    alert("Contatos atualizados com sucesso!");
}

function buscarCEP() {
    const campoCEP = document.getElementById("cep");
    if (!campoCEP) return;

    const cep = campoCEP.value.replace(/\D/g, "");

    if (cep.length !== 8) {
        alert("CEP inválido.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(dados => {
            if (dados.erro) {
                alert("CEP não encontrado.");
                return;
            }

            const endereco = document.getElementById("endereco");
            const bairro = document.getElementById("bairro");
            const cidade = document.getElementById("cidade");

            if (endereco) endereco.value = dados.logradouro || "";
            if (bairro) bairro.value = dados.bairro || "";
            if (cidade) cidade.value = dados.localidade || "";
        })
        .catch(erro => {
            console.error("Erro ao buscar CEP:", erro);
            alert("Não foi possível consultar o CEP.");
        });
}

function voltarPagina() {
    window.history.back();
}

window.addEventListener("load", function () {
    const tipo = localStorage.getItem("tipoUsuario");

    const editarArea = document.getElementById("editarArea");
    if (editarArea) {
        editarArea.style.display =
            tipo === "veterinario" ? "flex" : "none";
    }

    const favoritos = document.getElementById("favoritos");
    if (favoritos && tipo === "veterinario") {
        favoritos.style.display = "none";
    }

    const salvos = JSON.parse(
        localStorage.getItem("dadosContatos") || "null"
    );

    if (salvos) {
        ["tel1", "mail1", "tel2", "mail2", "tel3", "mail3"].forEach(id => {
            const campo = document.getElementById(id);
            if (campo && salvos[id] !== undefined) {
                campo.value = salvos[id];
            }
        });
    }
});
