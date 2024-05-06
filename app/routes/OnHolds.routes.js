const express = require("express");
const { onHoldController } = require("../controllers");

const router = express.Router();

router.post("/", onHoldController.createOnHold);

router.get("/", onHoldController.getOnHolds);
router.get("/:id", onHoldController.getOnHoldById);

router.patch("/:id", onHoldController.patchOnHold);

router.delete("/:id", onHoldController.deleteOnHold);

module.exports = router;
