const express = require("express");
const router = express.Router();
const controller = require("../controllers/animal.controller");
const { validate, permitirTipo } = require("../middlewares/auth");

router.get("/listar", controller.listar);
router.get("/buscar/:id", controller.buscar);
router.post("/cadastrar", validate, permitirTipo("CLINICA"), controller.cadastrar);
router.put("/atualizar/:id", validate, permitirTipo("CLINICA"), controller.atualizar);
router.delete("/excluir/:id", validate, permitirTipo("CLINICA"), controller.excluir);

module.exports = router;