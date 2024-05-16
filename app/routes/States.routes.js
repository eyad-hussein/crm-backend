const express = require("express");
const { stateController } = require("../controllers");

const router = express.Router();

router.post("/", stateController.createState);

router.get("/", stateController.getStates);
router.get("/:id", stateController.getStateById);

router.patch("/:id", stateController.patchState);

router.delete("/:id", stateController.deleteState);

module.exports = router;
