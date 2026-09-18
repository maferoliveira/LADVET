<<<<<<< HEAD
function imagemPet(foto) {
    if (!foto) return "../img/user.png";
    if (foto.startsWith("data:image")) return foto;
    return foto.includes("/") ? foto : `../img/${foto}`;
}

const STATUS_ANIMAL = {
    DISPONIVEL: "🐾 Disponível",
    EM_PROCESSO: "⏳ Em processo de adoção",
    ADOTADO: "❤️ Adotado"
};

async function carregarPet() {
    const id = Number(localStorage.getItem("petSelecionado"));

    if (!id) {
        alert("Pet não selecionado.");
        window.location.href = "pag-adocao.html";
=======
const params = new URLSearchParams(window.location.search);
const animalID = Number(params.get("id"));

async function carregarPet() {
    if (!protegerPagina()) return;

    if (!animalID) {
        alert("Animal não encontrado.");
        window.location.href = "../html/pag-adocao.html";
>>>>>>> 23d6582e705e51f51230aa664c3aa93353adf961
        return;
    }

    try {
        const pet = await apiFetch(`/animal/buscar/${animalID}`);

<<<<<<< HEAD
        const foto = document.getElementById("fotoPet");
        const nome = document.getElementById("nomePet");
        const idade = document.getElementById("idadePet");
        const especie = document.getElementById("especiePet");
        const sexo = document.getElementById("sexoPet");
        const temperamento = document.getElementById("temperamentoPet");
        const descricao = document.getElementById("descricaoPet");
        const status = document.getElementById("statusPet");

        if (foto) foto.src = imagemPet(pet.foto);
        if (nome) nome.textContent = `Nome: ${pet.nome}`;
        if (idade) idade.textContent = `Idade: ${pet.idade} ano(s)`;
        if (especie) especie.textContent = `Espécie: ${pet.especie}`;
        if (sexo) sexo.textContent = `Sexo: ${pet.sexo}`;
        if (temperamento) temperamento.textContent = `Temperamento: ${pet.temperamento || "Não informado"}`;
        if (descricao) descricao.textContent = pet.descricao || "Descrição não informada.";
        if (status) status.textContent = STATUS_ANIMAL[pet.status] || pet.status;

        await carregarVacinas(pet.id);

        const tipo = localStorage.getItem("tipoUsuario");
        const botao = document.querySelector(".adotar");
        const favorito = document.querySelector(".favorito");

        if (favorito && tipo !== "veterinario") {
            const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
            favorito.innerHTML = favoritos.map(String).includes(String(pet.id)) ? "♥" : "♡";
            if (favorito.innerHTML === "♥") favorito.classList.add("ativo");
            favorito.onclick = event => favoritarPet(favorito, event, pet.id);
        } else if (favorito) {
            favorito.style.display = "none";
        }

        if (botao) {
            if (tipo === "veterinario" || pet.status !== "DISPONIVEL") {
                botao.style.display = "none";
            } else {
                botao.style.display = "block";
                botao.onclick = () => {
                    if (!getToken()) {
                        alert("Faça login para solicitar a adoção.");
                        window.location.href = "login.html";
                        return;
                    }
                    window.location.href = `solicitacao.html?pet=${pet.id}`;
                };
=======
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
>>>>>>> 23d6582e705e51f51230aa664c3aa93353adf961
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
        console.error(erro);
        alert(erro.message);
    }
}

<<<<<<< HEAD
async function carregarVacinas(animalID) {
    const elemento = document.getElementById("carteiraVacinas");
    const resumo = document.getElementById("vacinaPet");
    if (!elemento && !resumo) return;

    try {
        const vacinas = await apiFetch(`/vacina/listar/${animalID}`);

        if (resumo) {
            resumo.textContent = vacinas.length
                ? `Vacinas: ${vacinas.map(v => v.nome).join(", ")}`
                : "Vacinas: Nenhuma registrada";
        }

        if (elemento) {
            if (!vacinas.length) {
                elemento.innerHTML = "<p>Nenhuma vacina cadastrada.</p>";
                return;
            }

            elemento.innerHTML = `
                <div class="carteira-header"><h2>💉 Carteira de vacinação</h2></div>
                <table class="tabela-vacinas">
                    <thead><tr><th>Vacina</th><th>Aplicação</th><th>Próxima dose</th></tr></thead>
                    <tbody>
                        ${vacinas.map(v => `
                            <tr>
                                <td>${v.nome}</td>
                                <td>${formatarData(v.dataAplicacao)}</td>
                                <td>${v.proximaDose ? formatarData(v.proximaDose) : "—"}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            `;
        }
    } catch (erro) {
        if (elemento) elemento.innerHTML = `<p>${erro.message}</p>`;
    }
}

function formatarData(data) {
    if (!data) return "—";
    return new Date(data).toLocaleDateString("pt-BR");
}

function favoritarPet(el, event, id) {
    if (event) event.stopPropagation();
    if (localStorage.getItem("tipoUsuario") === "veterinario") return;

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.map(String);

    if (favoritos.includes(String(id))) {
        favoritos = favoritos.filter(item => item !== String(id));
        el.innerHTML = "♡";
        el.classList.remove("ativo");
    } else {
        favoritos.push(String(id));
        el.innerHTML = "♥";
        el.classList.add("ativo");
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

window.addEventListener("DOMContentLoaded", () => {
    if (!protegerPagina()) return;
    carregarPet();
});
=======

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
>>>>>>> 23d6582e705e51f51230aa664c3aa93353adf961
