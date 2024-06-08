const { extensionRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getExtensions = asyncHandler(async (req, res, next) => {
  res.json(await extensionRepository.getExtensions());
});

const getExtensionById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await extensionRepository.getExtensionById(id));
});

const patchExtension = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await extensionRepository.patchExtension(id, body);
  res.json({ message: "Extension and associated models updated successfully" });
});

const deleteExtension = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await extensionRepository.deleteExtension(id);
  res.json({ message: "Extension and associated models deleted successfully" });
});

const createExtension = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const extension = await extensionRepository.createExtension(body);
  const { id } = extension;
  res.json(id);
});

module.exports = {
  getExtensions,
  getExtensionById,
  patchExtension,
  deleteExtension,
  createExtension,
};
