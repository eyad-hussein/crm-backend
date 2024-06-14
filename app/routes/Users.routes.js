const express = require("express");
const { userController, activityController } = require("../controllers");

const router = express.Router();

router.get("/:userId/activities", activityController.getActivitiesByUserId);

router.post("/", userController.createUser);

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);

router.patch("/:id", userController.patchUser);
// router.patch("/:id/:state", userController.patchUserState);

router.delete("/:id", userController.deleteUser);

module.exports = router;
