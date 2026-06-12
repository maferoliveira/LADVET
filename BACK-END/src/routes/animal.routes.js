const animalcontroller = require("../controllers/animal.controller")
const express = require("express");
const animalroutes = express.Router();
const validate = require("../middlewares/auth")
const permitirTipo = require("../middlewares/permitirTipo");

const { cadastrar, listar, buscar, atualizar, excluir } = require("../controllers/animal.controller");

animalroutes.post("/cadastrar",validate, permitirTipo("CLINICA"), cadastrar);
animalroutes.get("/listar", validate, listar);
animalroutes.get("/buscar/:id", validate, buscar);
animalroutes.put("/atualizar/:id", validate, permitirTipo("CLINICA"), atualizar);
animalroutes.delete("/excluir/:id", validate, permitirTipo("CLINICA"), excluir);

module.exports = animalroutes;
