const lista = document.getElementById("listaSolicitacoes");

let solicitacoes =
    JSON.parse(localStorage.getItem("solicitacoes")) || [];

function garantirVeterinario() {
    const usuario =
        JSON.parse(localStorage.getItem("usuarioLogado") || "null");

    if (
        !usuario ||
        localStorage.getItem("tipoUsuario") !== "veterinario"
    ) {
        alert("Somente veterinários podem acessar as solicitações.");
        window.location.href = "../html/identificacao.html";
        return false;
    }

    return true;
}

function carregarSolicitacoes() {
    if (!garantirVeterinario()) return;

    solicitacoes =
        JSON.parse(localStorage.getItem("solicitacoes")) || [];

    lista.innerHTML = "";

    if (solicitacoes.length === 0) {
        lista.innerHTML = `
            <p>Nenhuma solicitação recebida.</p>
        `;
        return;
    }

    solicitacoes.forEach((pedido, index) => {
        const finalizada =
            pedido.status === "Aceito" ||
            pedido.status === "Recusado";

        lista.innerHTML += `
            <div class="solicitacao">
                <h2>🐾 ${pedido.pet}</h2>

                <p><b>Nome:</b> ${pedido.nome}</p>
                <p><b>Email:</b> ${pedido.email || "Não informado"}</p>
                <p><b>Idade:</b> ${pedido.idade}</p>
                <p><b>Cidade:</b> ${pedido.cidade}</p>
                <p><b>Telefone:</b> ${pedido.telefone}</p>
                <p><b>Moradia:</b> ${pedido.moradia}</p>
                <p><b>Experiência:</b> ${pedido.experiencia}</p>
                <p><b>Motivo:</b> ${pedido.motivo}</p>
                <p><b>Cuidados:</b> ${pedido.cuidados}</p>

                <h3>Status: ${pedido.status}</h3>

                ${
                    !finalizada
                    ? `
                        <div class="botoes">
                            <button
                                class="aceitar"
                                onclick="aceitar(${index})"
                            >
                                Autorizar adoção
                            </button>

                            <button
                                class="recusar"
                                onclick="recusar(${index})"
                            >
                                Recusar
                            </button>
                        </div>
                    `
                    : ""
                }
            </div>
        `;
    });
}

function atualizarStatusPetParaAdotado(nomePet) {
    let petsNovos =
        JSON.parse(localStorage.getItem("petsNovos")) || [];

    let alterou = false;

    petsNovos = petsNovos.map(pet => {
        if (pet.nome === nomePet) {
            alterou = true;
            return {
                ...pet,
                status: "Adotado"
            };
        }

        return pet;
    });

    if (alterou) {
        localStorage.setItem(
            "petsNovos",
            JSON.stringify(petsNovos)
        );
    }
}

function aceitar(index) {
    if (!garantirVeterinario()) return;

    const solicitacao = solicitacoes[index];

    if (!solicitacao || solicitacao.status !== "Pendente") {
        return;
    }

    const pet = solicitacao.pet;

    solicitacao.status = "Aceito";

    let petsAdotados =
        JSON.parse(localStorage.getItem("petsAdotados")) || [];

    if (!petsAdotados.includes(pet)) {
        petsAdotados.push(pet);
    }

    localStorage.setItem(
        "petsAdotados",
        JSON.stringify(petsAdotados)
    );

    atualizarStatusPetParaAdotado(pet);

    localStorage.setItem(
        "solicitacoes",
        JSON.stringify(solicitacoes)
    );

    carregarSolicitacoes();

    alert("Adoção aprovada! O animal agora está como adotado. ❤️");
}

function recusar(index) {
    if (!garantirVeterinario()) return;

    if (
        !solicitacoes[index] ||
        solicitacoes[index].status !== "Pendente"
    ) {
        return;
    }

    solicitacoes[index].status = "Recusado";

    salvar();
}

function salvar() {
    localStorage.setItem(
        "solicitacoes",
        JSON.stringify(solicitacoes)
    );

    carregarSolicitacoes();
}

carregarSolicitacoes();
