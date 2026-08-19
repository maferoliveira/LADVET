const express = require("express");
const router = express.Router();
const controller = require("../controllers/adocao.controller");
const auth = require("../middlewares/auth");

router.get("/listar", auth, controller.listar);
router.get("/minhas", auth, controller.listarMinhas);
router.get("/buscar/:id", auth, controller.buscar);
router.post("/cadastrar", auth, controller.cadastrar);
router.put("/atualizar/:id", auth, controller.atualizar);
router.delete("/excluir/:id", auth, controller.excluir);

module.exports = router;
