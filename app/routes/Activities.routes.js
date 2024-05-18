const express = require("express");
const { activityController } = require("../controllers");

const router = express.Router({ mergeParams: true });

router.post("/", activityController.createActivity);

router.get("/", activityController.getActivities);
router.get("/:id", activityController.getActivityById);

router.patch("/:id", activityController.patchActivity);

router.delete("/:id", activityController.deleteActivity);

module.exports = router;
