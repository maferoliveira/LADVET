const usuariocontroller = require("../controllers/usuario.controller");
const express = require("express");
const usuarioroutes = express.Router();
const validate = require("../middlewares/auth")
const permitirTipo = require("../middlewares/permitirTipo");

const { login, cadastrar, listar, buscar, atualizar, excluir } = require("../controllers/usuario.controller");

usuarioroutes.post("/login", login);
usuarioroutes.post("/cadastrar", cadastrar);
usuarioroutes.get("/listar", listar);
usuarioroutes.get("/buscar/:id", buscar);
usuarioroutes.put("/atualizar/:id", validate, permitirTipo("CLINICA"), atualizar);
usuarioroutes.delete("/excluir/:id", excluir);

module.exports = usuarioroutes;
