const { reserveRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getReserves = asyncHandler(async (req, res, next) => {
  res.json(await reserveRepository.getReserves());
});

const getReserveById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await reserveRepository.getReserveById(id));
});

const patchReserve = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await reserveRepository.patchReserve(id, body);
  res.json({ message: "Reserve and associated models updated successfully" });
});

const deleteReserve = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await reserveRepository.deleteReserve(id);
  res.json({ message: "Reserve and associated models deleted successfully" });
});

const createReserve = asyncHandler(async (req, res, next) => {
  const { body } = req;

  const reserve = await reserveRepository.createReserve(body);
  const { id } = reserve;
  res.json(id);
});

module.exports = {
  getReserves,
  getReserveById,
  patchReserve,
  deleteReserve,
  createReserve,
};
