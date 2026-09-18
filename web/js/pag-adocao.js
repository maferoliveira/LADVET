const lista = document.getElementById("listaPets");

function imagemPet(pet) {
    if (!pet.foto) {
        return "../img/user.png";
    }

    if (pet.foto.startsWith("data:image")) {
        return pet.foto;
    }

    return pet.foto.includes("/")
        ? pet.foto
        : `../img/${pet.foto}`;
}

async function carregarPets() {
    if (!protegerPagina()) {
        return;
    }

    try {
        const usuario = getUsuario();

        if (!usuario) {
            return;
        }

        const clinica = usuario.tipo_usuario === "CLINICA";
        const adotante = usuario.tipo_usuario === "ADOTANTE";

        const pets = await apiFetch("/animal/listar");

        lista.innerHTML = "";

        // Botão para cadastrar animal:
        // somente a clínica pode ver
        const novoAnimal = document.getElementById("novoAnimal");

        if (novoAnimal) {
            novoAnimal.style.display = clinica
                ? "block"
                : "none";
        }

        if (!pets || pets.length === 0) {
            lista.innerHTML = `
                <p>
                    ${
                        clinica
                            ? "Nenhum animal cadastrado."
                            : "Nenhum animal disponível para adoção."
                    }
                </p>
            `;
            return;
        }

        pets.forEach(pet => {

            const statusTexto = {
                DISPONIVEL: "🐾 Disponível",
                EM_PROCESSO: "⏳ Em processo de adoção",
                ADOTADO: "❤️ Adotado"
            };

            lista.innerHTML += `
                <div
                    class="pet"
                    data-pet="${pet.id}"
                    onclick="abrirPet(${pet.id})"
                >

                    <img
                        src="${imagemPet(pet)}"
                        alt="${pet.nome}"
                    >

                    <div class="info">

                        <h3>${pet.nome}</h3>

                        <p>${pet.especie}</p>

                        <p>${pet.idade} ano(s)</p>

                        <p>
                            ${statusTexto[pet.status] || pet.status}
                        </p>

                    </div>

                    ${
                        adotante
                            ? `
                                <div
                                    class="card-footer"
                                    onclick="favoritar(this, event)"
                                    title="Favoritar"
                                >
                                    ♡
                                </div>
                            `
                            : ""
                    }

                </div>
            `;
        });

    } catch (erro) {

        console.error("Erro ao carregar animais:", erro);

        lista.innerHTML = `
            <p>${erro.message}</p>
        `;
    }
}

carregarPets();