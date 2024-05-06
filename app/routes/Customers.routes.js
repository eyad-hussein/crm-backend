const express = require("express");
const { customerController } = require("../controllers");
const onHoldsRouter = require("./OnHolds.routes");
const reservesRouter = require("./Reserves.routes");
const prospectsRouter = require("./Prospects.routes");
const clientsRouter = require("./Clients.routes");
const proposalsRouter = require("./Proposals.routes");

const router = express.Router();
router.use("/on-holds", onHoldsRouter);
router.use("/reserves", reservesRouter);
router.use("/prospects", prospectsRouter);
router.use("/clients", clientsRouter);
router.use("/proposals", proposalsRouter);

router.post("/", customerController.createCustomer);

router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomerById);

router.patch("/:id", customerController.patchCustomer);
router.patch("/:id/:state", customerController.patchCustomerState);

router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
