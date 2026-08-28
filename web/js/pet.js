const PETS_FIXOS = {
    tulipa: {
        foto: "../img/tulipa.png",
        nome: "Tulipa", idade: "2 anos", especie: "Felino",
        sexo: "Fêmea", temperamento: "Mansa",
        descricao: "Encontrada na frente da igreja matriz. Estava machucada na área dos olhos. É bem mansa e carinhosa.",
        vacina: "Antirrábica e polivalente", status: "Disponível"
    },
    thor: {
        foto: "../img/thor.png",
        nome: "Thor", idade: "3 anos", especie: "Canino",
        sexo: "Macho", temperamento: "Assustado",
        descricao: "Achado na rua do Clube Santa Sofia. Estava sem ferimentos. Manso mas assustado.",
        vacina: "Necessita de vacinas", status: "Em processo de adoção"
    },
    pretinho: {
        foto: "../img/pretinho.png",
        nome: "Pretinho", idade: "4 anos", especie: "Canino",
        sexo: "Macho", temperamento: "Bravo",
        descricao: "Encontrado debaixo da ponte perto do Bairro Marajoara. Estava com ferimentos no rabo e com carrapato.",
        vacina: "Necessita de vacinas", status: "Adotado"
    },
    nina: {
        foto: "../img/nina.png",
        nome: "Nina", idade: "2 anos", especie: "Felino",
        sexo: "Fêmea", temperamento: "Arisca",
        descricao: "Apareceu na casa de uma cliente de madrugada, perto do Supermercado Guarani. Estava sem ferimentos. Bem arisca e assustada.",
        vacina: "Necessita de medicamentos", status: "Disponível"
    },
    aurora: {
        foto: "../img/aurora.png",
        nome: "Aurora", idade: "1 ano", especie: "Felino",
        sexo: "Fêmea", temperamento: "Mansa",
        descricao: "Cria de uma gatinha de uma cliente. Bem mansa e carinhosa.",
        vacina: "Necessita de medicamentos", status: "Disponível"
    },
    romeu: {
        foto: "../img/romeu.png",
        nome: "Romeu", idade: "1 ano", especie: "Felino",
        sexo: "Macho", temperamento: "Bravo",
        descricao: "Encontrado perto do Jardim Alzira. Estava sem ferimentos. Bem bravo e tenta atacar quando se aproximam.",
        vacina: "Necessita de medicamentos", status: "Disponível"
    },
    duck: {
        foto: "../img/duck.png",
        nome: "Duck", idade: "10 anos", especie: "Canino",
        sexo: "Macho", temperamento: "Arisco/bravo",
        descricao: "Encontrada perto do Portal do Limoeiro. Com sinais de briga e atacado, mas dócil.",
        vacina: "Necessita de medicamentos", status: "Em processo de adoção"
    },
    fred: {
        foto: "../img/fred.png",
        nome: "Fred", idade: "8 anos", especie: "Canino",
        sexo: "Macho", temperamento: "Assustado",
        descricao: "Encontrado perto da Choupana. Sem ferimentos. Ele é dócil, porém, bem assustado.",
        vacina: "Antirrábica", status: "Adotado"
    },
    jady: {
        foto: "../img/jady.png",
        nome: "Jady", idade: "5 anos", especie: "Canino",
        sexo: "Fêmea", temperamento: "Dócil",
        descricao: "Encontrado perto do Supermercado Guarani. Sem ferimentos. Bem arisco e ataca quando se aproximam.",
        vacina: "Antirrábica", status: "Disponível"
    },
    theo: {
        foto: "../img/theo.png",
        nome: "Theo", idade: "3 anos", especie: "Canino",
        sexo: "Macho", temperamento: "Arisco",
        descricao: "Apareceu na casa de uma cliente de madrugada, perto do Supermercado Guarani. Estava sem ferimentos. Bem arisca e assustada.",
        vacina: "Antirrábica", status: "Disponível"
    },
    meggie: {
        foto: "../img/meggie.png",
        nome: "Meggie", idade: "8 anos", especie: "Canino",
        sexo: "Fêmea", temperamento: "Brava",
        descricao: "Encontrada nas praças da Prainha. Com ferimentos na orelha. Ataca quando se aproxima, bem brava.",
        vacina: "Necessita de medicamentos", status: "Disponível"
    },
    salsicha: {
        foto: "../img/salsicha.png",
        nome: "Salsicha", idade: "3 anos", especie: "Canino",
        sexo: "Macho", temperamento: "Manso",
        descricao: "Encontrado na Praça Coronel João Pedro. Com sinais de briga. Bem manso.",
        vacina: "V10 e Antirrábica", status: "Disponível"
    }
};

// Carteiras iniciais dos pets fixos.
// O veterinário pode alterar depois.
const CARTEIRAS_INICIAIS = {
    Tulipa: { tomadas: ["Antirrábica", "Polivalente"], necessarias: [] },
    Thor: { tomadas: [], necessarias: ["V10", "Antirrábica"] },
    Pretinho: { tomadas: [], necessarias: ["V10", "Antirrábica"] },
    Nina: { tomadas: [], necessarias: ["Antirrábica", "Polivalente"] },
    Aurora: { tomadas: [], necessarias: ["Antirrábica", "Polivalente"] },
    Romeu: { tomadas: [], necessarias: ["Antirrábica", "Polivalente"] },
    Duck: { tomadas: [], necessarias: ["V10", "Antirrábica"] },
    Fred: { tomadas: ["Antirrábica"], necessarias: [] },
    Jady: { tomadas: ["Antirrábica"], necessarias: [] },
    Theo: { tomadas: ["Antirrábica"], necessarias: [] },
    Meggie: { tomadas: [], necessarias: ["V10", "Antirrábica"] },
    Salsicha: { tomadas: ["V10", "Antirrábica"], necessarias: [] }
};

function normalizarLista(lista) {
    return Array.isArray(lista)
        ? lista.map(v => String(v).trim()).filter(Boolean)
        : [];
}

function obterPetAtual() {
    const nome = localStorage.getItem("petSelecionado");

    if (!nome) return null;

    const chave = nome.toLowerCase();

    if (PETS_FIXOS[chave]) {
        return { ...PETS_FIXOS[chave] };
    }

    const petsNovos =
        JSON.parse(localStorage.getItem("petsNovos")) || [];

    const encontrado = petsNovos.find(
        pet =>
            pet.nome &&
            pet.nome.toLowerCase() === chave
    );

    if (!encontrado) return null;

    return {
        foto: encontrado.foto || "../img/user.png",
        nome: encontrado.nome,
        idade: encontrado.idade || "",
        especie: encontrado.especie || "",
        sexo: encontrado.sexo || "",
        vacina: encontrado.vacina || "Confira a carteira de vacinação.",
        temperamento: encontrado.temperamento || "",
        descricao: encontrado.descricao || "",
        status: encontrado.status || "Disponível"
    };
}

function obterCarteiras() {
    return JSON.parse(
        localStorage.getItem("carteirasVacinas")
    ) || {};
}

function salvarCarteiras(carteiras) {
    localStorage.setItem(
        "carteirasVacinas",
        JSON.stringify(carteiras)
    );
}

function obterCarteira(nomePet) {
    const carteiras = obterCarteiras();

    if (!carteiras[nomePet]) {
        const petsNovos =
            JSON.parse(localStorage.getItem("petsNovos")) || [];

        const novo = petsNovos.find(
            p => p.nome === nomePet
        );

        carteiras[nomePet] = {
            tomadas: normalizarLista(novo?.vacinasTomadas),
            necessarias: normalizarLista(novo?.vacinasNecessarias)
        };

        if (
            carteiras[nomePet].tomadas.length === 0 &&
            carteiras[nomePet].necessarias.length === 0 &&
            CARTEIRAS_INICIAIS[nomePet]
        ) {
            carteiras[nomePet] = {
                tomadas: [...CARTEIRAS_INICIAIS[nomePet].tomadas],
                necessarias: [...CARTEIRAS_INICIAIS[nomePet].necessarias]
            };
        }

        salvarCarteiras(carteiras);
    }

    return {
        tomadas: normalizarLista(carteiras[nomePet].tomadas),
        necessarias: normalizarLista(carteiras[nomePet].necessarias)
    };
}

function obterStatusReal(pet) {
    const adotados =
        JSON.parse(localStorage.getItem("petsAdotados")) || [];

    if (adotados.includes(pet.nome)) {
        return "Adotado";
    }

    const solicitacoes =
        JSON.parse(localStorage.getItem("solicitacoes")) || [];

    const possuiPendente = solicitacoes.some(
        s =>
            s.pet === pet.nome &&
            s.status === "Pendente"
    );

    if (possuiPendente) {
        return "Em processo de adoção";
    }

    return pet.status || "Disponível";
}

function renderizarCarteira(nomePet) {
    const carteiraElemento =
        document.getElementById("carteiraVacinas");

    if (!carteiraElemento) return;

    const tipo =
        localStorage.getItem("tipoUsuario");

    const carteira = obterCarteira(nomePet);

    const linhas = [];

    carteira.tomadas.forEach(vacina => {
        linhas.push({
            nome: vacina,
            status: "Tomada"
        });
    });

    carteira.necessarias.forEach(vacina => {
        // Evita duplicar uma vacina que já foi tomada.
        if (!carteira.tomadas.includes(vacina)) {
            linhas.push({
                nome: vacina,
                status: "Necessita tomar"
            });
        }
    });

    if (linhas.length === 0) {
        linhas.push({
            nome: "Nenhuma vacina cadastrada",
            status: "Sem registro"
        });
    }

    let html = `
        <div class="carteira-header">
            <h2>💉 Carteira de vacinação</h2>
        </div>

        <table class="tabela-vacinas">
            <thead>
                <tr>
                    <th>Vacina</th>
                    <th>Situação</th>
                </tr>
            </thead>
            <tbody>
    `;

    linhas.forEach((linha, index) => {
        if (
            tipo === "veterinario" &&
            linha.status !== "Sem registro"
        ) {
            html += `
                <tr>
                    <td>${linha.nome}</td>
                    <td>
                        <select
                            class="select-vacina"
                            data-vacina-index="${index}"
                            data-vacina-nome="${linha.nome}"
                        >
                            <option value="Tomada" ${linha.status === "Tomada" ? "selected" : ""}>
                                ✓ Tomada
                            </option>
                            <option value="Necessita tomar" ${linha.status === "Necessita tomar" ? "selected" : ""}>
                                ⚠ Necessita tomar
                            </option>
                        </select>
                    </td>
                </tr>
            `;
        } else {
            html += `
                <tr>
                    <td>${linha.nome}</td>
                    <td class="${linha.status === "Tomada" ? "vacina-tomada" : "vacina-pendente"}">
                        ${linha.status === "Tomada" ? "✓ Tomada" : linha.status === "Necessita tomar" ? "⚠ Necessita tomar" : "—"}
                    </td>
                </tr>
            `;
        }
    });

    html += `
            </tbody>
        </table>
    `;

    if (tipo === "veterinario") {
        html += `
            <button
                type="button"
                class="btn-editar-vacinas"
                onclick="editarVacinas('${nomePet.replace(/'/g, "\\'")}')"
            >
                ✏️ Alterar vacinação
            </button>

            <button
                type="button"
                class="btn-salvar-vacinas"
                id="btnSalvarVacinas"
                style="display:none;"
                onclick="salvarVacinas('${nomePet.replace(/'/g, "\\'")}')"
            >
                💾 Salvar alterações
            </button>
        `;
    }

    carteiraElemento.innerHTML = html;
}

function editarVacinas(nomePet) {
    if (localStorage.getItem("tipoUsuario") !== "veterinario") {
        alert("Somente o veterinário pode alterar a carteira.");
        return;
    }

    document
        .querySelectorAll(".select-vacina")
        .forEach(select => {
            select.style.display = "block";
        });

    const salvar = document.getElementById("btnSalvarVacinas");
    if (salvar) salvar.style.display = "block";

    const editar = document.querySelector(".btn-editar-vacinas");
    if (editar) editar.style.display = "none";
}

function salvarVacinas(nomePet) {
    if (localStorage.getItem("tipoUsuario") !== "veterinario") {
        alert("Somente o veterinário pode alterar a carteira.");
        return;
    }

    const selects =
        document.querySelectorAll(".select-vacina");

    const tomadas = [];
    const necessarias = [];

    selects.forEach(select => {
        const nome = select.dataset.vacinaNome;
        const status = select.value;

        if (status === "Tomada") {
            tomadas.push(nome);
        } else {
            necessarias.push(nome);
        }
    });

    const carteiras = obterCarteiras();

    carteiras[nomePet] = {
        tomadas,
        necessarias
    };

    salvarCarteiras(carteiras);

    // Mantém os dados de um pet novo sincronizados.
    let petsNovos =
        JSON.parse(localStorage.getItem("petsNovos")) || [];

    petsNovos = petsNovos.map(pet => {
        if (pet.nome !== nomePet) return pet;

        return {
            ...pet,
            vacinasTomadas: tomadas,
            vacinasNecessarias: necessarias
        };
    });

    localStorage.setItem(
        "petsNovos",
        JSON.stringify(petsNovos)
    );

    renderizarCarteira(nomePet);

    alert("Carteira de vacinação atualizada!");
}

function solicitarAdocao(nomePet) {
    if (!nomePet) {
        nomePet = localStorage.getItem("petSelecionado");
    }

    const usuario = obterUsuarioLogado();

    if (!usuario) {
        alert("Você precisa fazer login para solicitar uma adoção.");
        window.location.href = "../html/identificacao.html";
        return;
    }

    if (localStorage.getItem("tipoUsuario") === "veterinario") {
        alert("Veterinários não podem solicitar adoção.");
        return;
    }

    localStorage.setItem("petParaAdocao", nomePet);

    window.location.href =
        "solicitacao.html?pet=" +
        encodeURIComponent(nomePet);
}

function favoritarPet(el) {
    if (localStorage.getItem("tipoUsuario") === "veterinario") {
        return;
    }

    const nomePet =
        localStorage.getItem("petSelecionado");

    if (!nomePet) return;

    let favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.includes(nomePet)) {
        favoritos = favoritos.filter(pet => pet !== nomePet);
        el.innerHTML = "♡";
        el.classList.remove("ativo");
        el.style.color = "";
    } else {
        favoritos.push(nomePet);
        el.innerHTML = "♥";
        el.classList.add("ativo");
        el.style.color = "red";
    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );
}

window.addEventListener("load", function () {
    if (!protegerPagina()) return;

    const pet = obterPetAtual();

    if (!pet) {
        alert("Pet não encontrado.");
        window.location.href = "pag-adocao.html";
        return;
    }

    const tipo = localStorage.getItem("tipoUsuario");
    const statusReal = obterStatusReal(pet);

    const foto = document.getElementById("fotoPet");
    const nome = document.getElementById("nomePet");
    const idade = document.getElementById("idadePet");
    const especie = document.getElementById("especiePet");
    const sexo = document.getElementById("sexoPet");
    const vacina = document.getElementById("vacinaPet");
    const temperamento = document.getElementById("temperamentoPet");
    const descricao = document.getElementById("descricaoPet");
    const status = document.getElementById("statusPet");
    const favorito = document.querySelector(".favorito");
    const botaoAdotar = document.querySelector(".adotar");

    if (foto) foto.src = pet.foto;
    if (nome) nome.textContent = "Nome: " + pet.nome;
    if (idade) idade.textContent = "Idade: " + pet.idade;
    if (especie) especie.textContent = "Espécie: " + pet.especie;
    if (sexo) sexo.textContent = "Sexo: " + pet.sexo;
    if (vacina) vacina.textContent = "Resumo: " + pet.vacina;
    if (temperamento) temperamento.textContent = "Temperamento: " + pet.temperamento;
    if (descricao) descricao.textContent = pet.descricao;

    if (status) {
        status.textContent =
            statusReal === "Adotado"
                ? "❤️ Adotado"
                : "Status: " + statusReal;

        status.style.color =
            statusReal === "Adotado" ? "red" : "";
    }

    if (favorito) {
        if (tipo === "veterinario") {
            favorito.style.display = "none";
        } else {
            const favoritos =
                JSON.parse(localStorage.getItem("favoritos")) || [];

            if (favoritos.includes(pet.nome)) {
                favorito.textContent = "♥";
                favorito.style.color = "red";
            }
        }
    }

    if (botaoAdotar) {
        if (
            tipo === "veterinario" ||
            statusReal === "Adotado"
        ) {
            botaoAdotar.style.display = "none";
        } else {
            botaoAdotar.style.display = "block";
            botaoAdotar.onclick = function () {
                solicitarAdocao(pet.nome);
            };
        }
    }

    renderizarCarteira(pet.nome);
});
