const express = require("express");
const { cityController } = require("../controllers");

const router = express.Router();

router.post("/", cityController.createCity);

router.get("/", cityController.getCities);
router.get("/:id", cityController.getCityById);

router.patch("/:id", cityController.patchCity);

router.delete("/:id", cityController.deleteCity);

module.exports = router;
