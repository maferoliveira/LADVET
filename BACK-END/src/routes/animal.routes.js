const animalcontroller = require("../controllers/animal.controller")
const express = require("express");
const animalroutes = express.Router();
const validate = require("../middlewares/auth")
const validaveterinario = require("../middlewares/validacargo")

animalroutes.post("/cadastrar", validate, validaveterinario, animalcontroller.cadastrar);
animalroutes.get("/listar", animalcontroller.listar);
animalroutes.get("/buscar/:id", animalcontroller.buscar);
animalroutes.put("/atualizar/:id", validate, validaveterinario, animalcontroller.atualizar);
animalroutes.delete("/excluir/:id", validate, validaveterinario, animalcontroller.excluir);

module.exports = animalroutes;
