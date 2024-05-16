const express = require("express");
const { customerPhoneNumberController } = require("../controllers");

const router = express.Router();

router.post("/", customerPhoneNumberController.createCustomerPhoneNumber);

router.get("/", customerPhoneNumberController.getCustomerPhoneNumbers);
router.get("/:id", customerPhoneNumberController.getCustomerPhoneNumberById);

router.patch("/:id", customerPhoneNumberController.patchCustomerPhoneNumber);

router.delete("/:id", customerPhoneNumberController.deleteCustomerPhoneNumber);

module.exports = router;
