const { industryRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getIndustries = asyncHandler(async (req, res, next) => {
  res.json(await industryRepository.getIndustries());
});

const getIndustryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await industryRepository.getIndustryById(id));
});

const patchIndustry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await industryRepository.patchIndustry(id, body);
  res.json({ message: "Industry and associated models updated successfully" });
});

const deleteIndustry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await industryRepository.deleteIndustry(id);
  res.json({ message: "Industry and associated models deleted successfully" });
});

const createIndustry = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const industry = await industryRepository.createIndustry(body);
  const { id } = industry;
  res.json(id);
});

module.exports = {
  getIndustries,
  getIndustryById,
  patchIndustry,
  deleteIndustry,
  createIndustry,
};
