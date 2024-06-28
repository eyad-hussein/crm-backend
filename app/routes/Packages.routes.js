const express = require("express");
const { packageController } = require("../controllers");

const router = express.Router();

router.post("/", packageController.createPackage);

router.get("/:id", packageController.getPackageById);
router.get("/", packageController.getPackages);

router.patch("/:id", packageController.patchPackage);

router.delete("/:id", packageController.deletePackage);

module.exports = router;
