const express = require("express");
const { meetingController } = require("../controllers");

const router = express.Router();

router.post("/", meetingController.createMeeting);

router.get("/", meetingController.getMeetings);

router.patch("/:id", meetingController.patchMeeting);

router.delete("/:id", meetingController.deleteMeeting);

module.exports = router;
