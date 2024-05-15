const { stateRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getStates = asyncHandler(async (req, res, next) => {
  res.json(await stateRepository.getStates());
});

const getStateById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await stateRepository.getStateById(id));
});

const patchState = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await stateRepository.patchState(id, body);
  res.json({
    message: "State and associated models updated successfully",
  });
});

const deleteState = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await stateRepository.deleteState(id);
  res.json({
    message: "State and associated models deleted successfully",
  });
});

const createState = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const state = await stateRepository.createState(body);
  const { id } = state;
  res.json(id);
});

module.exports = {
  getStates,
  getStateById,
  patchState,
  deleteState,
  createState,
};
