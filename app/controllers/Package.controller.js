const { packageRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getPackages = asyncHandler(async (req, res, next) => {
  res.json(await packageRepository.getPackages());
});

const getPackageById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await packageRepository.getPackageById(id));
});

const patchPackage = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await packageRepository.patchPackage(id, body);
  res.json({
    message: "Package and associated models updated successfully",
  });
});

const deletePackage = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await packageRepository.deletePackage(id);
  res.json({
    message: "Package and associated models deleted successfully",
  });
});

const createPackage = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const package = await packageRepository.createPackage(body);
  const { id } = package;
  res.json(id);
});

module.exports = {
  getPackages,
  getPackageById,
  patchPackage,
  deletePackage,
  createPackage,
};
