const express = require("express");
const { userController, activityController } = require("../controllers");
const { authenticateJWT, authorizeRoles } = require("../middlewares");

const router = express.Router();

router.use(authenticateJWT);

router.get("/:userId/activities", activityController.getActivitiesByUserId);

router.post("/", authorizeRoles(["admin"]), userController.createUser);

router.get("/search", authorizeRoles(["admin"]), userController.searchForUser);
router.get("/", userController.getUsers);
router.get("/:id", authorizeRoles(["admin"]), userController.getUserById);

router.patch("/:id", authorizeRoles(["admin"]), userController.patchUser);

router.delete("/:id", authorizeRoles(["admin"]), userController.deleteUser);

module.exports = router;
