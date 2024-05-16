const express = require("express");
const { countryController } = require("../controllers");

const router = express.Router();

router.post("/", countryController.createCountry);

router.get("/", countryController.getCountries);
router.get("/:id", countryController.getCountryById);

router.patch("/:id", countryController.patchCountry);

router.delete("/:id", countryController.deleteCountry);

module.exports = router;
