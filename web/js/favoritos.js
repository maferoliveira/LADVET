async function carregarFavoritos() {
    if (!protegerPagina("adotante")) return;

    const lista = document.getElementById("listaFavoritos");
    if (!lista) return;

    const favoritos = (JSON.parse(localStorage.getItem("favoritos")) || []).map(String);
    lista.innerHTML = "";

    if (!favoritos.length) {
        lista.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;">
                Você ainda não possui favoritos.
            </p>
        `;
        return;
    }

    try {
        const pets = await apiFetch("/animal/listar");
        const selecionados = pets.filter(pet => favoritos.includes(String(pet.id)));

        if (!selecionados.length) {
            lista.innerHTML = `<p style="grid-column:1/-1;text-align:center;">Você ainda não possui favoritos.</p>`;
            return;
        }

        selecionados.forEach(pet => {
            const imagem = pet.foto?.startsWith("data:image")
                ? pet.foto
                : pet.foto?.includes("/") ? pet.foto : `../img/${pet.foto || "user.png"}`;

            lista.innerHTML += `
                <div class="pet" onclick="abrirPetFavorito(${pet.id})">
                    <img src="${imagem}" alt="${pet.nome}">
                    <div class="info"><h3>Nome: ${pet.nome}</h3></div>
                </div>
            `;
        });
    } catch (erro) {
        lista.innerHTML = `<p>${erro.message}</p>`;
    }
}

function abrirPetFavorito(id) {
    localStorage.setItem("petSelecionado", String(id));
    window.location.href = "pet.html";
}

carregarFavoritos();
