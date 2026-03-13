const express = require("express")
const router = express.Router();

const usuariocontrollers = require("../controllers/usuario.controller")

router.post("/cadastrarusuario", usuariocontrollers.novousuario)
router.post("/loginusuario", usuariocontrollers.loginusuario)
router.get("/listarusuarios", usuariocontrollers.listarusuarios)
router.get("/buscarusuario/:id", usuariocontrollers.buscarusuario)
router.delete("/deletarusuario/:id", usuariocontrollers.deletarusuario)
router.update("/atualizarusuario/:id", usuariocontrollers.atualizarusuario)

module.exports = router;

