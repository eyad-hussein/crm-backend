const express = require("express");
const { closureController } = require("../controllers");

const router = express.Router();

router.post("/", closureController.createClosure);

router.get("/", closureController.getClosures);
router.get("/:id", closureController.getClosureById);

router.patch("/:id", closureController.patchClosure);

router.delete("/:id", closureController.deleteClosure);

module.exports = router;
