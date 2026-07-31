const favoritos =

JSON.parse(
localStorage.getItem(
"favoritos"
)

)||[];

const lista =

document.getElementById(
"listaFavoritos"
);

lista.innerHTML="";

favoritos.forEach(nome=>{

lista.innerHTML+=`

<div
class="pet"
onclick="abrirPet('${nome}')">

<img
src="../img/${nome}.png">

</div>

`;

});

function abrirPet(nome){

localStorage.setItem(
"petSelecionado",
nome
);

window.location.href=
"pet.html";

}