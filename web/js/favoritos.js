window.addEventListener("load", function () {
    if (!protegerPagina("adotante")) return;

    const favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    const petsNovos =
        JSON.parse(localStorage.getItem("petsNovos")) || [];

    const lista =
        document.getElementById("listaFavoritos");

    if (!lista) return;

    lista.innerHTML = "";

    if (favoritos.length === 0) {
        lista.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;">
                Você ainda não possui favoritos.
            </p>
        `;
        return;
    }

    favoritos.forEach(nome => {
        const petNovo = petsNovos.find(
            pet => pet.nome === nome
        );

        const imagem = petNovo?.foto || "../img/" + nome.toLowerCase() + ".png";

        lista.innerHTML += `
            <div
                class="pet"
                onclick="abrirPetFavorito('${nome.replace(/'/g, "\\'")}')"
            >
                <img src="${imagem}" alt="${nome}">
                <div class="info">
                    <h3>Nome: ${nome}</h3>
                </div>
            </div>
        `;
    });
});

function abrirPetFavorito(nome) {
    localStorage.setItem("petSelecionado", nome);
    window.location.href = "pet.html";
}
