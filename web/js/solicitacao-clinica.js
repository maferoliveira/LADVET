const lista = document.getElementById("listaSolicitacoes");

<<<<<<< HEAD
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

=======
async function carregarSolicitacoes() {
    try {
        const solicitacoes = await apiFetch("/adocao/listar");
        lista.innerHTML = "";

        if (!solicitacoes.length) {
            lista.innerHTML = "<p>Nenhuma solicitação recebida.</p>";
            return;
        }

        solicitacoes.forEach(pedido => {
            lista.innerHTML += `
                <div class="solicitacao">
                    <h2>🐾 ${pedido.animal?.nome || "Animal"}</h2>
                    <p><b>Nome:</b> ${pedido.adotante?.nome || "-"}</p>
                    <p><b>Cidade:</b> ${pedido.adotante?.cidade || "-"}</p>
                    <p><b>Telefone:</b> ${pedido.adotante?.telefone || "-"}</p>
                    <p><b>Moradia:</b> ${pedido.moradia}</p>
                    <p><b>Experiência:</b> ${pedido.experiencia || "-"}</p>
                    <p><b>Tempo disponível:</b> ${pedido.tempoDisponivel}</p>
                    <h3>Status: ${pedido.status}</h3>
                    <div class="botoes">
                        <button class="aceitar" onclick="atualizarStatus(${pedido.id}, 'APROVADA')">Aceitar</button>
                        <button class="recusar" onclick="atualizarStatus(${pedido.id}, 'RECUSADA')">Recusar</button>
                    </div>
                </div>
            `;
        });
    } catch (erro) {
        lista.innerHTML = `<p>${erro.message}</p>`;
    }
}

async function atualizarStatus(id, status) {
    try {
        await apiFetch(`/adocao/atualizar/${id}`, {
            method: "PUT",
            body: JSON.stringify({ status })
        });
        alert(status === "APROVADA" ? "Adoção aprovada! 🐾" : "Adoção recusada.");
        carregarSolicitacoes();
    } catch (erro) {
        alert(erro.message);
    }
}

>>>>>>> 8b973fd49b2adc0846d2cd963dea3e45030a95c1
carregarSolicitacoes();
