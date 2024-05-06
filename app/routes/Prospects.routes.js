const express = require("express");
const { prospectController } = require("../controllers");

const router = express.Router();

router.post("/", prospectController.createProspect);

router.get("/", prospectController.getProspects);
router.get("/:id", prospectController.getProspectById);

router.patch("/:id", prospectController.patchProspect);

router.delete("/:id", prospectController.deleteProspect);

module.exports = router;
