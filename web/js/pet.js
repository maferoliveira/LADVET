const params = new URLSearchParams(window.location.search);
const animalID = Number(params.get("id"));

async function carregarPet() {
    if (!protegerPagina()) return;

    if (!animalID) {
        alert("Animal não encontrado.");
        window.location.href = "../html/pag-adocao.html";
        return;
    }

    try {
        const pet = await apiFetch(`/animal/buscar/${animalID}`);

        const nome = document.getElementById("nomePet");
        if (nome) {
            nome.textContent = pet.nome || "";
        }

        const idade = document.getElementById("idadePet");
        if (idade) {
            idade.textContent = `Idade: ${pet.idade || 0} ano(s)`;
        }

        const especie = document.getElementById("especiePet");
        if (especie) {
            especie.textContent = `Espécie: ${pet.especie || ""}`;
        }

        const sexo = document.getElementById("sexoPet");
        if (sexo) {
            sexo.textContent = `Sexo: ${pet.sexo || "-"}`;
        }

        const temperamento = document.getElementById("temperamentoPet");
        if (temperamento) {
            temperamento.textContent =
                `Temperamento: ${pet.temperamento || "-"}`;
        }

        const status = document.getElementById("statusPet");
        if (status) {
            status.textContent = `Status: ${pet.status || "-"}`;
        }

        const descricao = document.getElementById("descricaoPet");
        if (descricao) {
            descricao.textContent = pet.descricao || "";
        }

        const foto = document.getElementById("fotoPet");

        if (foto) {
            if (pet.foto) {
                foto.src = pet.foto.startsWith("data:image")
                    ? pet.foto
                    : pet.foto.includes("/")
                        ? pet.foto
                        : `../img/${pet.foto}`;
            } else {
                foto.src = "../img/user.png";
            }
        }

        const usuario = getUsuario();

        const botaoAdotar = document.querySelector(".adotar");
        const btnExcluir = document.getElementById("btnExcluir");

        // ADOTANTE
        if (usuario?.tipo_usuario === "ADOTANTE") {

            if (btnExcluir) {
                btnExcluir.style.display = "none";
            }

            if (botaoAdotar) {

                if (pet.status !== "DISPONIVEL") {
                    botaoAdotar.style.display = "none";
                } else {
                    botaoAdotar.style.display = "block";

                    botaoAdotar.onclick = function () {
                        window.location.href =
                            `../html/solicitacao.html?pet=${pet.id}`;
                    };
                }
            }
        }

        // CLÍNICA
        else if (usuario?.tipo_usuario === "CLINICA") {

            if (botaoAdotar) {
                botaoAdotar.style.display = "none";
            }

            if (btnExcluir) {
                btnExcluir.style.display = "block";

                btnExcluir.onclick = async function () {

                    const confirmar = confirm(
                        "Tem certeza que deseja excluir este animal?"
                    );

                    if (!confirmar) {
                        return;
                    }

                    try {
                        await apiFetch(`/animal/${animalID}`, {
                            method: "DELETE"
                        });

                        alert("Animal excluído com sucesso!");

                        window.location.href =
                            "../html/pag-adocao.html";

                    } catch (erro) {
                        alert(
                            "Não foi possível excluir o animal: " +
                            erro.message
                        );
                    }
                };
            }
        }

        await carregarVacinas();

    } catch (erro) {
        alert(erro.message);
    }
}


async function carregarVacinas() {

    const carteira =
        document.getElementById("carteiraVacinas");

    if (!carteira) {
        return;
    }

    try {

        const vacinas =
            await apiFetch(`/vacina/listar/${animalID}`);

        if (!vacinas.length) {

            carteira.innerHTML = `
                <h3>Carteira de vacinação</h3>
                <p>Nenhuma vacina registrada.</p>
            `;

            return;
        }

        carteira.innerHTML = `
            <h3>Carteira de vacinação</h3>

            ${vacinas.map(vacina => `
                <div class="vacina">

                    <p>
                        <strong>${vacina.nome}</strong>
                    </p>

                    <p>
                        Aplicação:
                        ${new Date(vacina.dataAplicacao)
                            .toLocaleDateString("pt-BR")}
                    </p>

                    <p>
                        Próxima dose:
                        ${
                            vacina.proximaDose
                                ? new Date(vacina.proximaDose)
                                    .toLocaleDateString("pt-BR")
                                : "Não informada"
                        }
                    </p>

                    <p>
                        Veterinário:
                        ${vacina.veterinario || "-"}
                    </p>

                    <p>
                        Lote:
                        ${vacina.lote || "-"}
                    </p>

                </div>
            `).join("")}
        `;

    } catch (erro) {

        carteira.innerHTML = `
            <p>${erro.message}</p>
        `;
    }
}


carregarPet();