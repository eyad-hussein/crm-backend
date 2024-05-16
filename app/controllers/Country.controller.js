const { countryRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getCountries = asyncHandler(async (req, res, next) => {
  res.json(await countryRepository.getCountries());
});

const getCountryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await countryRepository.getCountryById(id));
});

const patchCountry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await countryRepository.patchCountry(id, body);
  res.json({ message: "Country and associated models updated successfully" });
});

const deleteCountry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await countryRepository.deleteCountry(id);
  res.json({ message: "Country and associated models deleted successfully" });
});

const createCountry = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const country = await countryRepository.createCountry(body);
  const { id } = country;
  res.json(id);
});

module.exports = {
  getCountries,
  getCountryById,
  patchCountry,
  deleteCountry,
  createCountry,
};
