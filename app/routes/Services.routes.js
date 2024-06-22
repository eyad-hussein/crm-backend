const express = require("express");
const { serviceController } = require("../controllers");

const router = express.Router();

router.post("/", serviceController.createService);

router.get("/:id", serviceController.getServiceById);
router.get("/", serviceController.getServices);

router.patch("/:id", serviceController.patchService);

router.delete("/:id", serviceController.deleteService);

module.exports = router;
