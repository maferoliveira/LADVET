function imagemPet(foto) {
    if (!foto) return "../img/user.png";
    if (foto.startsWith("data:image")) return foto;
    return foto.includes("/") ? foto : `../img/${foto}`;
}

async function carregarPet() {
    const id = localStorage.getItem("petSelecionado");

    if (!id) {
        alert("Pet não selecionado.");
        window.location.href = "pag-adocao.html";
        return;
    }

    try {
        const pet = await apiFetch(`/animal/buscar/${id}`);

        document.getElementById("fotoPet").src = imagemPet(pet.foto);
        document.getElementById("nomePet").innerHTML = "Nome: " + pet.nome;
        document.getElementById("idadePet").innerHTML = "Idade: " + pet.idade + " ano(s)";
        document.getElementById("especiePet").innerHTML = "Espécie: " + pet.especie;
        document.getElementById("sexoPet").innerHTML = "Sexo: " + pet.sexo;
        document.getElementById("temperamentoPet").innerHTML = "Temperamento: " + (pet.temperamento || "Não informado");
        document.getElementById("descricaoPet").innerHTML = "Status: " + pet.status;

        const status = document.getElementById("statusPet");
        if (status) {
            status.innerHTML = "Status: " + ({
                DISPONIVEL: "Disponível",
                EM_PROCESSO: "Em processo de adoção",
                ADOTADO: "Adotado"
            }[pet.status] || pet.status);
        }

        const vacinas = await apiFetch(`/vacina/animal/${pet.id}`);
        const vacinaEl = document.getElementById("vacinaPet");
        if (vacinaEl) {
            vacinaEl.innerHTML = vacinas.length
                ? "Vacinas: " + vacinas.map(v => v.nome).join(", ")
                : "Vacinas: Nenhuma registrada";
        }

        const botao = document.querySelector(".adotar");
        if (botao) {
            botao.disabled = pet.status !== "DISPONIVEL";
            botao.onclick = () => {
                if (!getToken()) {
                    alert("Faça login para solicitar a adoção.");
                    window.location.href = "login.html";
                    return;
                }
                window.location.href = `solicitacao.html?pet=${pet.id}`;
            };
        }
    } catch (erro) {
        alert(erro.message);
        window.location.href = "pag-adocao.html";
    }
}

function favoritarPet(el) {
    const id = localStorage.getItem("petSelecionado");
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    if (favoritos.includes(String(id))) {
        favoritos = favoritos.filter(x => x !== String(id));
        el.innerHTML = "♡";
    } else {
        favoritos.push(String(id));
        el.innerHTML = "♥";
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

window.addEventListener("DOMContentLoaded", carregarPet);
