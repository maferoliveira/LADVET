function irParaHome(){
window.location.href="../html/identificacao.html";
}

function selecionar(tipo){

localStorage.setItem(
"tipoUsuario",
tipo
);

if(tipo==="veterinario"){

window.location.href=
"../html/login-veterinario.html";

}else{

window.location.href=
"../html/login.html";

}

}

function voltarIdentificacao(){
window.location.href="../html/inicio.html";
}

function irParaInicio(){
window.location.href="../html/inicio.html";
}

function irParaCadastro(){
window.location.href="../html/cadastro.html";
}

function voltarLogin(){
window.location.href="../html/login.html";
}

function irParaHomeSistema(){
window.location.href="../html/home.html";
}


/* LOGIN */

function entrarSistema(event){

event.preventDefault();

window.location.href=
"../html/pag-adocao.html";

}


/* FAVORITOS */

function favoritar(elemento,event){

if(event){
event.stopPropagation();
}

const card=
elemento.closest(".pet");

if(!card)return;

const nome=
card.dataset.pet;

if(!nome)return;

let favoritos=
JSON.parse(
localStorage.getItem(
"favoritos"
)
)||[];

if(
favoritos.includes(nome)
){

favoritos=
favoritos.filter(
p=>p!==nome
);

elemento.classList.remove(
"ativo"
);

elemento.innerHTML=
"♡";

}else{

favoritos.push(nome);

elemento.classList.add(
"ativo"
);

elemento.innerHTML=
"♥";

}

localStorage.setItem(
"favoritos",
JSON.stringify(
favoritos
));

}


/* PET */

function abrirPet(nomePet){

localStorage.setItem(
"petSelecionado",
nomePet
);

window.location.href=
"../html/pet.html";

}


/* PERFIL */

function abrirPerfil(){

window.location.href=
"../html/perfil.html";

}


/* FAVORITOS */

function abrirFavoritos(){

window.location.href=
"../html/favoritos.html";

}


/* CADASTRO ANIMAL */

function abrirCadastroAnimal(){

window.location.href=
"../html/cadastro-animal.html";

}


window.onload=function(){

const tipo=
localStorage.getItem(
"tipoUsuario"
);

const novo=
document.getElementById(
"novoAnimal"
);

if(
novo &&
tipo==="veterinario"
){

novo.style.display=
"flex";

}

};