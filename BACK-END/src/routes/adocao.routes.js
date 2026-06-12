const adocaocontroller = require("../controllers/adocao.controller")
const express = require("express");
const adocaoroutes = express.Router();
const validate = require("../middlewares/auth")
const permitirTipo = require("../middlewares/permitirTipo");

const { cadastrar, listar, buscar, atualizar, excluir } = require("../controllers/adocao.controller");

adocaoroutes.post("/cadastrar", validate, permitirTipo("CLINICA"), cadastrar);
adocaoroutes.get("/listar", validate, listar);
adocaoroutes.get("/buscar/:id", validate, buscar);
adocaoroutes.put("/atualizar/:id", validate, permitirTipo("CLINICA"), atualizar);
adocaoroutes.delete("/excluir/:id", validate, permitirTipo("CLINICA"), excluir);

module.exports = adocaoroutes;
