const express = require("express");
const { userPhoneNumberController } = require("../controllers");

const router = express.Router();

router.post("/", userPhoneNumberController.createUserPhoneNumber);

router.get("/", userPhoneNumberController.getUserPhoneNumbers);
router.get("/:id", userPhoneNumberController.getUserPhoneNumberById);

router.patch("/:id", userPhoneNumberController.patchUserPhoneNumber);

router.delete("/:id", userPhoneNumberController.deleteUserPhoneNumber);

module.exports = router;
