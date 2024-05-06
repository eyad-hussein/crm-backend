const { onHoldRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getOnHolds = asyncHandler(async (req, res, next) => {
  res.json(await onHoldRepository.getOnHolds());
});

const getOnHoldById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await onHoldRepository.getOnHoldById(id));
});

const patchOnHold = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await onHoldRepository.patchOnHold(id, body);
  res.json({ message: "OnHold and associated models updated successfully" });
});

const deleteOnHold = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await onHoldRepository.deleteOnHold(id);
  res.json({ message: "OnHold and associated models deleted successfully" });
});

const createOnHold = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const onHold = await onHoldRepository.createOnHold(body);
  const { id } = onHold;
  res.json(id);
});

module.exports = {
  getOnHolds,
  getOnHoldById,
  patchOnHold,
  deleteOnHold,
  createOnHold,
};
