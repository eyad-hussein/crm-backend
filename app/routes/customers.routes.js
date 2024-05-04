const express = require("express");
const {
  getCustomers,
} = require("../controllers/CustomerController.controller");
const router = express.Router();

router.get("/", getCustomers);

module.exports = router;
