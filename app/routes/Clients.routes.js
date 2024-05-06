const express = require("express");
const { clientController } = require("../controllers");

const router = express.Router();

router.post("/", clientController.createClient);

router.get("/", clientController.getClients);
router.get("/:id", clientController.getClientById);

router.patch("/:id", clientController.patchClient);

router.delete("/:id", clientController.deleteClient);

module.exports = router;
