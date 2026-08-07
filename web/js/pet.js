window.onload = function () {

const pets = {

tulipa:{
foto:"../img/tulipa.png",
nome:"Tulipa",
idade:"2 anos",
especie:"Felino",
sexo:"Fêmea",
vacina:"Antirrábica e polivalente",
temperamento:"Mansa",
descricao:
"Encontrada na frente da igreja matriz. Estava machucada na área dos olhos. É bem mansa e carinhosa.",
status:"Disponível"
},

thor:{
foto:"../img/thor.png",
nome:"Thor",
idade:"3 anos",
especie:"Canino",
sexo:"Macho",
vacina:"Necessita de vacinas",
temperamento:"Assustado",
descricao:
"Achado na rua do Clube Santa Sofia. Estava sem ferimentos. Manso mas assustado.",
status:"Em processo de adoção"
},

pretinho:{
foto:"../img/pretinho.png",
nome:"Pretinho",
idade:"4 anos",
especie:"Canino",
sexo:"Macho",
vacina:"Necessita de vacinas",
temperamento:"Bravo",
descricao:
"Encontrado debaixo da ponte perto do Bairro Marajoara. Estava com ferimentos no rabo  e com carrapato.",
status:"Adotado"
},

nina:{
foto:"../img/nina.png",
nome:"Nina",
idade:"2 anos",
especie:"Felino",
sexo:"Fêmea",
vacina:"Necessita de medicamentos",
temperamento:"Arisca",
descricao:
"Apareceu na casa de uma cliente de madrugada, perto do Supermercado Guarani. Estava sem ferimentos. Bem arisca e assustada.",
status:"Disponível"
},

aurora:{
foto:"../img/aurora.png",
nome:"Aurora",
idade:"1 ano",
especie:"Felino",
sexo:"Fêmea",
vacina:"Necessita de medicamentos",
temperamento:"Mansa",
descricao:
"Cria de uma gatinha de uma cliente. Bem mansa e carinhosa.",
status:"Disponível"
},

romeu:{
foto:"../img/romeu.png",
nome:"Romeu",
idade:"1 ano",
especie:"Felino",
sexo:"Macho",
vacina:"Necessita de medicamentos",
temperamento:"Bravo",
descricao:
"Encontrado perto do Jardim Alzira. Estava sem ferimentos. Bem bravo e tenta atacar quando se aproximam.",
status:"Disponível"
},

duck:{
foto:"../img/duck.png",
nome:"Duck",
idade:"10 anos",
especie:"Canino",
sexo:"Macho",
vacina:"Necessita de medicamentos",
temperamento:"Arisco/bravo",
descricao:
"Encontrada perto do Portal do Limoeiro. Com sinais de briga e atacado, mas dócil.",
status:"Em processo de adoção"
},

fred:{
foto:"../img/fred.png",
nome:"Fred",
idade:"8 anos",
especie:"Canino",
sexo:"Macho",
vacina:"Antirrábica",
temperamento:"Assustado",
descricao:
"Encontrado perto da Choupana.Sem ferimentos. Ele é dócil, porém, bem assustado.",
status:"Adotado"
},

jady:{
foto:"../img/jady.png",
nome:"Jady",
idade:"5 anos",
especie:"Canino",
sexo:"Fêmea",
vacina:"Antirrábica",
temperamento:"Dócil",
descricao:
"Encontrado perto do Supermercado Guarani. Sem ferimentos. Bem arisco e ataca quando se aproximam.",
status:"Disponível"
},

theo:{
foto:"../img/theo.png",
nome:"Theo",
idade:"3 anos",
especie:"Canino",
sexo:"Macho",
vacina:"Antirrábica",
temperamento:"Arisco",
descricao:
"Apareceu na casa de uma cliente de madrugada, perto do Supermercado Guarani. Estava sem ferimentos. Bem arisca e assustada",
status:"Disponível"
},

meggie:{
foto:"../img/meggie.png",
nome:"Meggie",
idade:"8 anos",
especie:"Canino",
sexo:"Fêmea",
vacina:"Necessita de medicamentos",
temperamento:"Brava",
descricao:
"Encontrada nas praças da Prainha. Com ferimentos na orelha. Ataca quando se aproxima, bem brava",
status:"Disponível"
},

salsicha:{
foto:"../img/salsicha.png",
nome:"Salsicha",
idade:"3 anos",
especie:"Canino",
sexo:"Macho",
vacina:"V10 e Antirrábica",
temperamento:"Manso",
descricao:
"Encontrado na Praça Coronel João Pedro. Com sinais de briga. Bem mansa.",
status:"Disponível"
}

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


    }

}