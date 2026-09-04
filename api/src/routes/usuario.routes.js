const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuario.controller");
const { validate, permitirTipo } = require("../middlewares/auth");

router.post("/login", controller.login);
router.post("/cadastrar", controller.cadastrar);
router.get("/listar", validate, permitirTipo("CLINICA"), controller.listar);
router.get("/buscar/:id", validate, controller.buscar);
router.put("/atualizar/:id", validate, controller.atualizar);
router.delete("/excluir/:id", validate, controller.excluir);

module.exports = router;