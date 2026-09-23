window.addEventListener("load", async function () {

    if (!protegerPagina("adotante")) {
        return;
    }

    const lista =
        document.getElementById("listaFavoritos");

    if (!lista) {
        return;
    }

    try {

        const favoritos =
            JSON.parse(localStorage.getItem("favoritos")) || [];

        lista.innerHTML = "";

        if (favoritos.length === 0) {

            lista.innerHTML = `
                <p style="grid-column:1/-1;text-align:center;">
                    Você ainda não possui favoritos.
                </p>
            `;

            return;
        }

        const pets = await apiFetch("/animal/listar");

        const petsFavoritos = pets.filter(
            pet => favoritos.includes(Number(pet.id))
        );

        if (petsFavoritos.length === 0) {

            lista.innerHTML = `
                <p style="grid-column:1/-1;text-align:center;">
                    Você ainda não possui favoritos.
                </p>
            `;

            return;
        }

        petsFavoritos.forEach(pet => {

            let imagem = "../img/user.png";

            if (pet.foto) {

                if (pet.foto.startsWith("data:image")) {

                    imagem = pet.foto;

                } else if (
                    pet.foto.startsWith("http://") ||
                    pet.foto.startsWith("https://") ||
                    pet.foto.startsWith("../") ||
                    pet.foto.startsWith("/")
                ) {

                    imagem = pet.foto;

                } else {

                    imagem = `../img/${pet.foto}`;

                }
            }

            lista.innerHTML += `
                <div
                    class="pet"
                    onclick="abrirPetFavorito(${pet.id})"
                >

                    <img
                        src="${imagem}"
                        alt="${pet.nome}"
                    >

                    <div class="info">

                        <h3>${pet.nome}</h3>

                        <p>${pet.especie}</p>

                        <p>${pet.idade} ano(s)</p>

                    </div>

                    <div
                        class="card-footer"
                        onclick="removerFavorito(${pet.id}, event)"
                    >
                        ♥
                    </div>

                </div>
            `;
        });

    } catch (erro) {

        console.error(
            "Erro ao carregar favoritos:",
            erro
        );

        lista.innerHTML = `
            <p>
                Erro ao carregar favoritos.
            </p>
        `;
    }
});


function abrirPetFavorito(id) {

    window.location.href =
        `pet.html?id=${id}`;
}


function removerFavorito(id, event) {

    event.stopPropagation();

    let favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    favoritos = favoritos.filter(
        favoritoID => favoritoID !== id
    );

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    location.reload();
}