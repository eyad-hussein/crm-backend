const express = require("express");
const { customerController } = require("../controllers");

const router = express.Router();

router.post("/", customerController.createCustomer);

router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomerById);

router.patch("/:id", customerController.patchCustomer);
router.patch("/:id/:state", customerController.patchCustomerState);

router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
