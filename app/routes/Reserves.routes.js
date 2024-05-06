const express = require("express");
const { reserveController } = require("../controllers");

const router = express.Router();

router.post("/", reserveController.createReserve);

router.get("/", reserveController.getReserves);
router.get("/:id", reserveController.getReserveById);

router.patch("/:id", reserveController.patchReserve);

router.delete("/:id", reserveController.deleteReserve);

module.exports = router;
