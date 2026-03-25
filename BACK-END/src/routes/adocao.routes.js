const adocaocontroller = require("../controllers/adocao.controller")
const express = require("express");
const adocaoroutes = express.Router();

const { 
    cadastrar, 
    listar, 
    buscar, 
    atualizar, 
    excluir } = require("../controllers/adocao.controller");

adocaoroutes.post("/cadastrar", cadastrar);
adocaoroutes.get("/listar", listar);
adocaoroutes.get("/buscar/:id", buscar);
adocaoroutes.put("/atualizar/:id", atualizar);
adocaoroutes.delete("/excluir/:id", excluir);

module.exports = adocaoroutes;
