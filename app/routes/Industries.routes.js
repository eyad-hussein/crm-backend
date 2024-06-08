const express = require("express");
const { industryController } = require("../controllers");

const router = express.Router();

router.post("/", industryController.createIndustry);

router.get("/", industryController.getIndustries);
router.get("/:id", industryController.getIndustryById);

router.patch("/:id", industryController.patchIndustry);

router.delete("/:id", industryController.deleteIndustry);

module.exports = router;
