const express = require("express");
const { contactController } = require("../controllers");

const router = express.Router();

router.post("/", contactController.createContact);

router.get("/", contactController.getContacts);
router.get("/:id", contactController.getContactById);

router.patch("/:id", contactController.patchContact);

router.delete("/:id", contactController.deleteContact);

module.exports = router;
