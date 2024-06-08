const express = require("express");
const { countryController, stateController } = require("../controllers");
const statesRouter = require("./States.routes");

const router = express.Router();

router.post("/", countryController.createCountry);

router.get("/", countryController.getCountries);
router.get("/:id", countryController.getCountryById);

router.patch("/:id", countryController.patchCountry);

router.delete("/:id", countryController.deleteCountry);

router.get("/:countryId/states", stateController.getStatesByCountryId);

module.exports = router;
