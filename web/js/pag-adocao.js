const lista = document.getElementById("listaPets");

function imagemPet(pet) {
    if (!pet.foto) return "../img/user.png";
    if (pet.foto.startsWith("data:image")) return pet.foto;
    return pet.foto.includes("/") ? pet.foto : `../img/${pet.foto}`;
}

async function carregarPets() {
    try {
        const pets = await apiFetch("/animal/listar");

        lista.innerHTML = "";

        if (!pets.length) {
            lista.innerHTML = "<p>Nenhum animal cadastrado.</p>";
            return;
        }

        pets.forEach(pet => {
            const statusTexto = {
                DISPONIVEL: "🐾 Disponível",
                EM_PROCESSO: "⏳ Em processo de adoção",
                ADOTADO: "❤️ Adotado"
            }[pet.status] || pet.status;

            lista.innerHTML += `
                <div class="pet" data-pet="${pet.id}" onclick="abrirPet(${pet.id})">
                    <img src="${imagemPet(pet)}" alt="${pet.nome}">
                    <div class="info">
                        <h3>Nome: ${pet.nome}</h3>
                        <p>Idade: ${pet.idade} ano(s)</p>
                        <p>Espécie: ${pet.especie}</p>
                        <p class="status-pet">${statusTexto}</p>
                    </div>
                    <div class="card-footer" onclick="favoritar(this,event)">♡</div>
                </div>
            `;
        });
    } catch (erro) {
        console.error(erro);
        lista.innerHTML = `<p>Não foi possível carregar os animais.</p>`;
    }
}

const tipo = localStorage.getItem("tipoUsuario");
const novoAnimal = document.getElementById("novoAnimal");
if (novoAnimal && tipo !== "veterinario") novoAnimal.style.display = "none";

carregarPets();
