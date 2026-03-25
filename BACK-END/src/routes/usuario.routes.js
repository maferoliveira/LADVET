const usuariocontroller = require("../controllers/usuario.controller");
const express = require("express");
const usuarioroutes = express.Router();
const validate = require("../middlewares/auth")
const validaveterinario = require("../middlewares/validacargo")

usuarioroutes.post("/login", usuariocontroller.login);
usuarioroutes.post("/cadastrar", usuariocontroller.cadastrar);
usuarioroutes.get("/listar", validate, validaveterinario, usuariocontroller.listar);
usuarioroutes.get("/buscar/:id", validate, validaveterinario, usuariocontroller.buscar);
usuarioroutes.put("/atualizar/:id", validate, validaveterinario, usuariocontroller.atualizar);
usuarioroutes.delete("/excluir/:id", validate, validaveterinario, usuariocontroller.excluir);

module.exports = usuarioroutes;
