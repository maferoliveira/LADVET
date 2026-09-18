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
        return;
    }

    try {
        const pet = await apiFetch(`/animal/buscar/${id}`);

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
            }
        }
    } catch (erro) {
        console.error(erro);
        alert(erro.message);
        window.location.href = "pag-adocao.html";
    }
}

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
