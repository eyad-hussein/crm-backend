const { cityRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getCities = asyncHandler(async (req, res, next) => {
  res.json(await cityRepository.getCities());
});

const getCityById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await cityRepository.getCityById(id));
});

const patchCity = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await cityRepository.patchCity(id, body);
  res.json({
    message: "City and associated models updated successfully",
  });
});

const deleteCity = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await cityRepository.deleteCity(id);
  res.json({
    message: "City and associated models deleted successfully",
  });
});

const createCity = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const city = await cityRepository.createCity(body);
  const { id } = city;
  res.json(id);
});

module.exports = {
  getCities,
  getCityById,
  patchCity,
  deleteCity,
  createCity,
};
