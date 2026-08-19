const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuario.controller");
const { validate, permitirTipo } = require("../middlewares/auth");

router.post("/login", controller.login);
router.post("/cadastrar", controller.cadastrar);
router.get("/listar", controller.listar);
router.get("/buscar/:id", controller.buscar);
router.put("/atualizar/:id", controller.atualizar);
router.delete("/excluir/:id", controller.excluir);

module.exports = router;