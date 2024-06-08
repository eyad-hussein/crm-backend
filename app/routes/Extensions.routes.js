const express = require("express");
const { extensionController } = require("../controllers");

const router = express.Router();

router.post("/", extensionController.createExtension);

router.get("/", extensionController.getExtensions);
router.get("/:id", extensionController.getExtensionById);

router.patch("/:id", extensionController.patchExtension);

router.delete("/:id", extensionController.deleteExtension);

module.exports = router;
