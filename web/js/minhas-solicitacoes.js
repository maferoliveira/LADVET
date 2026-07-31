const lista = document.getElementById(
"listaStatus"
);



let solicitacoes = JSON.parse(
localStorage.getItem("solicitacoes")
) || [];



function carregar(){


lista.innerHTML="";



solicitacoes.forEach(pedido=>{


lista.innerHTML += `


<div class="card">


<h2>
🐾 ${pedido.pet}
</h2>


<p>
Solicitação para: ${pedido.pet}
</p>



<div class="status ${pedido.status}">

${mostrarMensagem(pedido.status)}

</div>



</div>


`;


});


}



function mostrarMensagem(status){


if(status === "Aceito"){

return "🎉 Parabéns! Sua adoção foi aprovada!";

}



if(status === "Recusado"){

return "😿 Sua solicitação não foi aprovada.";

}



return "⏳ Sua solicitação está sendo analisada.";

}



carregar();