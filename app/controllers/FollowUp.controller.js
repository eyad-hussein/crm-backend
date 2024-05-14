const { followUpRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getFollowUps = asyncHandler(async (req, res, next) => {
  res.json(await followUpRepository.getFollowUps());
});

const getFollowUpById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await followUpRepository.getFollowUpById(id));
});

const patchFollowUp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await followUpRepository.patchFollowUp(id, body);
  res.json({ message: "FollowUp and associated models updated successfully" });
});

const deleteFollowUp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await followUpRepository.deleteFollowUp(id);
  res.json({ message: "FollowUp and associated models deleted successfully" });
});

const createFollowUp = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const followUp = await followUpRepository.createFollowUp(body);
  const { id } = followUp;
  res.json(id);
});

module.exports = {
  getFollowUps,
  getFollowUpById,
  patchFollowUp,
  deleteFollowUp,
  createFollowUp,
};
