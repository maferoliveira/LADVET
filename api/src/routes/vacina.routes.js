const express = require("express");
const vacinaroutes = express.Router();
const validate = require("../middlewares/auth");
const permitirTipo = require("../middlewares/permitirTipo");

const { cadastrar, listarPorAnimal, buscar, atualizar, excluir } = require("../controllers/vacina.controller");

vacinaroutes.post("/cadastrar", validate, permitirTipo("CLINICA"), cadastrar);
vacinaroutes.get("/animal/:animalID", validate, listarPorAnimal);
vacinaroutes.get("/buscar/:id", validate, buscar);
vacinaroutes.put("/atualizar/:id", validate, permitirTipo("CLINICA"), atualizar);
vacinaroutes.delete("/excluir/:id", validate, permitirTipo("CLINICA"), excluir);

module.exports = vacinaroutes;
