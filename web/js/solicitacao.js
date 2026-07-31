const form = document.getElementById("formAdocao");


const url = new URLSearchParams(window.location.search);

const pet = url.get("pet");


console.log("Pet escolhido:", pet);



form.addEventListener("submit", function(event){

    event.preventDefault();

const dados = {

pet: pet,

nome: document.getElementById("nome").value,

idade: document.getElementById("idade").value,

cidade: document.getElementById("cidade").value,

telefone: document.getElementById("telefone").value,

moradia: document.getElementById("moradia").value,

espaco: document.getElementById("espaco").value,

experiencia: document.getElementById("experiencia").value,

motivo: document.getElementById("motivo").value,

cuidados: document.getElementById("cuidados").value

};


// SALVAR SOLICITAÇÃO

let solicitacoes = JSON.parse(
localStorage.getItem("solicitacoes")
) || [];


dados.status = "Pendente";


solicitacoes.push(dados);


localStorage.setItem(
"solicitacoes",
JSON.stringify(solicitacoes)
);


alert("Solicitação enviada com sucesso! 🐾");

form.reset();

});


// BOTÃO VOLTAR PARA A PÁGINA DE ADOÇÃO
function irParaInicio(){

    window.location.href = "pag-adocao.html";

}