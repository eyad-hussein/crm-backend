const express = require("express");
const { customerController } = require("../controllers");
const followUpsRouter = require("./FollowUps.routes");
const closuresRouter = require("./Closures.routes");
const prospectsRouter = require("./Prospects.routes");
const contactsRouter = require("./Contacts.routes");
const proposalsRouter = require("./Proposals.routes");

const router = express.Router();
router.use("/follow-ups", followUpsRouter);
router.use("/closures", closuresRouter);
router.use("/prospects", prospectsRouter);
router.use("/contacts", contactsRouter);
router.use("/proposals", proposalsRouter);

router.post("/", customerController.createCustomer);

router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomerById);

router.patch("/:id", customerController.patchCustomer);
router.patch("/:id/:status", customerController.patchCustomerStatus);

router.put("/:id", customerController.putCustomer);

router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
