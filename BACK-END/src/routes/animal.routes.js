const animalcontroller = require("../controllers/animal.controller")
const express = require("express");
const animalroutes = express.Router();
const validate = require("../middlewares/auth")
const permitirTipo = require("../middlewares/permitirTipo");

const { cadastrar, listar, buscar, atualizar, excluir } = require("../controllers/animal.controller");

animalroutes.post("/cadastrar", cadastrar);
animalroutes.get("/listar", validate, permitirTipo("CLINICA"), listar);
animalroutes.get("/buscar/:id", buscar);
animalroutes.put("/atualizar/:id", atualizar);
animalroutes.delete("/excluir/:id", excluir);

module.exports = animalroutes;
