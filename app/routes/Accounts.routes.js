const express = require("express");
const { accountController } = require("../controllers");

const router = express.Router();

router.post("/", accountController.createAccount);

router.get("/", accountController.getAccounts);
router.get("/:id", accountController.getAccountById);

router.patch("/:id", accountController.patchAccount);

router.delete("/:id", accountController.deleteAccount);

module.exports = router;
