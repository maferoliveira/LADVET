function imagemPet(foto) {
    if (!foto) return "../img/user.png";
    if (foto.startsWith("data:image")) return foto;
    return foto.includes("/") ? foto : `../img/${foto}`;
}

<<<<<<< HEAD
async function carregarPet() {
    const id = localStorage.getItem("petSelecionado");
=======
};


// Pegando o pet selecionado pelo card

const petSelecionado = localStorage.getItem("petSelecionado");

const chavePet = petSelecionado
    ? petSelecionado.toLowerCase()
    : null;


const pet = pets[chavePet];



if(!pet){

    alert("Pet não encontrado");

    window.location.href = "pag-adocao.html";

    return;

}



// Preenche as informações do pet

document.getElementById("fotoPet").src = pet.foto;

document.getElementById("nomePet").innerHTML =
"Nome: " + pet.nome;

document.getElementById("idadePet").innerHTML =
"Idade: " + pet.idade;

document.getElementById("especiePet").innerHTML =
"Espécie: " + pet.especie;

document.getElementById("sexoPet").innerHTML =
"Sexo: " + pet.sexo;

document.getElementById("vacinaPet").innerHTML =
"Vacinas: " + pet.vacina;

document.getElementById("temperamentoPet").innerHTML =
"Temperamento: " + pet.temperamento;

document.getElementById("descricaoPet").innerHTML =
pet.descricao;



// Status do pet

const status = document.getElementById("statusPet");


if(status){

    status.innerHTML = 
    "Status: " + pet.status;


    if(pet.status === "Adotado"){

        status.style.color = "red";

    }

}



// Botão solicitar adoção

const botaoAdotar = document.querySelector(".adotar");


if(botaoAdotar){

    botaoAdotar.addEventListener("click", function(){

        window.location.href =
        "solicitacao.html?pet=" + pet.nome;

    });

}


};



// Favoritar pet

function favoritarPet(el){


    if(el.innerHTML === "♡"){


        el.innerHTML = "♥";

        el.style.color = "red";


    }else{


        el.innerHTML = "♡";

        el.style.color = "white";

>>>>>>> 8e80fe7c1749cba0b14c97802465c69631d0a2cc

    if (!id) {
        alert("Pet não selecionado.");
        window.location.href = "pag-adocao.html";
        return;
    }

<<<<<<< HEAD
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
=======
}
>>>>>>> 8e80fe7c1749cba0b14c97802465c69631d0a2cc
