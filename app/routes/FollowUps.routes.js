const express = require("express");
const { followUpController } = require("../controllers");

const router = express.Router();

router.post("/", followUpController.createFollowUp);

router.get("/", followUpController.getFollowUps);
router.get("/:id", followUpController.getFollowUpById);

router.patch("/:id", followUpController.patchFollowUp);

router.delete("/:id", followUpController.deleteFollowUp);

module.exports = router;
