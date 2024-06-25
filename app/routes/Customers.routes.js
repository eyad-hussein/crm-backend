const express = require("express");
const { customerController } = require("../controllers");
const followUpsRouter = require("./FollowUps.routes");
const closuresRouter = require("./Closures.routes");
const prospectsRouter = require("./Prospects.routes");
const contactsRouter = require("./Contacts.routes");
const proposalsRouter = require("./Proposals.routes");
const { activityController } = require("../controllers");
const { authenticateJWT, authorizeRoles } = require("../middlewares");

const router = express.Router();

router.use(authenticateJWT);
router.use("/follow-ups", followUpsRouter);
router.use("/closures", closuresRouter);
router.use("/prospects", prospectsRouter);
router.use("/contacts", contactsRouter);
router.use("/proposals", proposalsRouter);

router.post(
  "/:customerId/activities",
  authorizeRoles("admin", "sales_manager", "sales_representative"),
  activityController.createActivity
);

router.post(
  "/",
  authorizeRoles("admin", "sales_manager", "sales_representative"),
  customerController.createCustomer
);
router.post(
  "/filter",
  authorizeRoles("admin", "sales_manager", "sales_representative"),
  customerController.filterCustomers
);
router.post(
  "/sort",
  authorizeRoles("admin", "sales_manager", "sales_representative"),
  customerController.sortCustomers
);

router.get(
  "/:customerId/activities",
  authorizeRoles("admin", "sales_manager", "sales_representative"),
  activityController.getActivitiesByCustomerId
);

router.get(
  "/",
  authorizeRoles("admin", "sales_manager", "sales_representative"),
  customerController.getCustomers
);
router.get(
  "/search",
  authorizeRoles("admin", "sales_manager", "sales_representative"),
  customerController.searchForCustomer
);
router.get(
  "/:id",
  authorizeRoles("admin", "sales_manager", "sales_representative"),
  customerController.getCustomerById
);

router.patch(
  "/:id",
  authorizeRoles("admin", "sales_manager", "sales_representative"),
  customerController.patchCustomer
);
router.patch(
  "/:id/:status",
  authorizeRoles("admin", "sales_manager", "sales_representative"),
  customerController.patchCustomerStatus
);

router.put(
  "/:id",
  authorizeRoles("admin", "sales_manager", "sales_representative"),
  customerController.putCustomer
);

router.delete(
  "/:id",
  authorizeRoles("admin", "sales_manager", "sales_representative"),
  customerController.deleteCustomer
);

module.exports = router;
