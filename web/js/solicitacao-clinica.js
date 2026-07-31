const lista = document.getElementById("listaSolicitacoes");


let solicitacoes = JSON.parse(
localStorage.getItem("solicitacoes")
) || [];



function carregarSolicitacoes(){


lista.innerHTML = "";


if(solicitacoes.length === 0){

lista.innerHTML = 
`
<p>
Nenhuma solicitação recebida.
</p>
`;

return;

}



solicitacoes.forEach((pedido,index)=>{


lista.innerHTML +=
`

<div class="solicitacao">


<h2>
🐾 ${pedido.pet}
</h2>


<p>
<b>Nome:</b> ${pedido.nome}
</p>


<p>
<b>Idade:</b> ${pedido.idade}
</p>


<p>
<b>Cidade:</b> ${pedido.cidade}
</p>


<p>
<b>Telefone:</b> ${pedido.telefone}
</p>


<p>
<b>Moradia:</b> ${pedido.moradia}
</p>


<p>
<b>Experiência:</b> ${pedido.experiencia}
</p>


<p>
<b>Motivo:</b> ${pedido.motivo}
</p>


<h3>
Status: ${pedido.status}
</h3>


<div class="botoes">


<button 
class="aceitar"
onclick="aceitar(${index})">

Aceitar

</button>



<button 
class="recusar"
onclick="recusar(${index})">

Recusar

</button>


</div>


</div>

`;

});


}



function aceitar(index){


solicitacoes[index].status = "Aceito";



let petsAdotados =
JSON.parse(
localStorage.getItem("petsAdotados")
) || [];



let pet =
solicitacoes[index].pet;



if(!petsAdotados.includes(pet)){


petsAdotados.push(pet);


}



localStorage.setItem(
"petsAdotados",
JSON.stringify(petsAdotados)
);



localStorage.setItem(
"solicitacoes",
JSON.stringify(solicitacoes)
);



carregarSolicitacoes();


alert("Adoção aprovada! 🐾");


}


function recusar(index){

solicitacoes[index].status = "Recusado";

salvar();

}



function salvar(){

localStorage.setItem(
"solicitacoes",
JSON.stringify(solicitacoes)
);


carregarSolicitacoes();

}



carregarSolicitacoes();