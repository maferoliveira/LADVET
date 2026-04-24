function irParaHome() {
  window.location.href = "../html/identificacao.html";
}

function selecionar(tipo) {
  localStorage.setItem("tipoUsuario", tipo);
  window.location.href = "../html/login.html";
}

function voltarIdentificacao() {
  window.location.href = "../html/identificacao.html";
}

function irParaInicio() {
  window.location.href = "../html/inicio.html";
}
function irParaCadastro() {
  window.location.href = "../html/cadastro.html";
}

function voltarLogin() {
  window.location.href = "../html/login.html";
}

function irParaHomeSistema() {
  window.location.href = "../html/home.html"; // futura tela
}