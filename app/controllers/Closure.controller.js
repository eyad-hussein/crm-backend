const { closureRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getClosures = asyncHandler(async (req, res, next) => {
  res.json(await closureRepository.getClosures());
});

const getClosureById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await closureRepository.getClosureById(id));
});

const patchClosure = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await closureRepository.patchClosure(id, body);
  res.json({ message: "Closure and associated models updated successfully" });
});

const deleteClosure = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await closureRepository.deleteClosure(id);
  res.json({ message: "Closure and associated models deleted successfully" });
});

const createClosure = asyncHandler(async (req, res, next) => {
  const { body } = req;

  const closure = await closureRepository.createClosure(body);
  const { id } = closure;
  res.json(id);
});

module.exports = {
  getClosures,
  getClosureById,
  patchClosure,
  deleteClosure,
  createClosure,
};
