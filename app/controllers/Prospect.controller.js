const { prospectRepository, customerRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getProspects = asyncHandler(async (req, res, next) => {
  res.json(await prospectRepository.getProspects());
});

const getProspectById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await prospectRepository.getProspectById(id));
});

const patchProspect = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await prospectRepository.patchProspect(id, body);
  res.json({ message: "Prospect and associated models updated successfully" });
});

const deleteProspect = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await prospectRepository.deleteProspect(id);
  res.json({ message: "Prospect and associated models deleted successfully" });
});

const createProspect = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const customer = await customerRepository.createCustomer(body);
  const prospect = await prospectRepository.createProspect({
    customer_id: customer.id,
  });
  const { id } = prospect;
  res.json(id);
});

module.exports = {
  getProspects,
  getProspectById,
  patchProspect,
  deleteProspect,
  createProspect,
};
