const express = require("express");
const { stateController, cityController } = require("../controllers");

const router = express.Router();

router.post("/", stateController.createState);

router.get("/:id", stateController.getStateById);
router.get("/", stateController.getStates);

router.patch("/:id", stateController.patchState);

router.delete("/:id", stateController.deleteState);

router.get("/:stateId/cities", cityController.getCitiesByStateId);

module.exports = router;
