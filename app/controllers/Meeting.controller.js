const { meetingRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getMeetings = asyncHandler(async (req, res, next) => {
  res.json(await meetingRepository.getMeetings());
});

const patchMeeting = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await meetingRepository.patchMeeting(id, body);
  res.json({
    message: "Meeting and associated models updated successfully",
  });
});

const putMeeting = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await meetingRepository.putMeeting(id, body);
  res.json({
    message: "Meeting and associated models updated successfully",
  });
});

const deleteMeeting = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await meetingRepository.deleteMeeting(id);
  res.json({
    message: "Meeting and associated models deleted successfully",
  });
});

const createMeeting = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const meeting = await meetingRepository.createMeeting(body);
  const { id } = meeting;
  res.json(id);
});

module.exports = {
  getMeetings,
  patchMeeting,
  putMeeting,
  deleteMeeting,
  createMeeting,
};
