const express = require("express");
const router = express.Router();
const controller = require("../controllers/vacina.controller");
const auth = require("../middlewares/auth");

router.get("/animal/:animalID", controller.listarPorAnimal);
router.get("/buscar/:id", controller.buscar);
router.post("/cadastrar", auth, controller.cadastrar);
router.put("/atualizar/:id", auth, controller.atualizar);
router.delete("/excluir/:id", auth, controller.excluir);

module.exports = router;
