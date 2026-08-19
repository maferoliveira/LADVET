const express = require("express"); const router = express.Router(); 
const controller = require("../controllers/adocao.controller"); 
const { validate, permitirTipo } = require("../middlewares/auth"); 

router.get("/listar", validate, permitirTipo("CLINICA"), controller.listar);
router.get("/minhas", validate, permitirTipo("ADOTANTE"), controller.listarMinhas); 
router.post("/cadastrar", validate, permitirTipo("ADOTANTE"), controller.cadastrar); 
router.put("/atualizar/:id", validate, permitirTipo("CLINICA"), controller.atualizar); 
router.delete("/excluir/:id", validate, permitirTipo("CLINICA"), controller.excluir); 

module.exports = router;