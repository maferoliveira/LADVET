const express = require("express");
const router = express.Router();
const controller = require("../controllers/animal.controller");
const auth = require("../middlewares/auth");

router.get("/listar", controller.listar);
router.get("/buscar/:id", controller.buscar);
router.post("/cadastrar", auth, controller.cadastrar);
router.put("/atualizar/:id", auth, controller.atualizar);
router.delete("/excluir/:id", auth, controller.excluir);

module.exports = router;
