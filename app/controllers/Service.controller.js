const { serviceRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getServices = asyncHandler(async (req, res, next) => {
  res.json(await serviceRepository.getServices());
});

const getServiceById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await serviceRepository.getServiceById(id));
});

const patchService = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await serviceRepository.patchService(id, body);
  res.json({
    message: "Service and associated models updated successfully",
  });
});

const deleteService = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await serviceRepository.deleteService(id);
  res.json({
    message: "Service and associated models deleted successfully",
  });
});

const createService = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const service = await serviceRepository.createService(body);
  const { id } = service;
  res.json(id);
});

module.exports = {
  getServices,
  getServiceById,
  patchService,
  deleteService,
  createService,
};
