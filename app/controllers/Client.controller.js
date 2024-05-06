const { clientRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getClients = asyncHandler(async (req, res, next) => {
  res.json(await clientRepository.getClients());
});

const getClientById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await clientRepository.getClientById(id));
});

const patchClient = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await clientRepository.patchClient(id, body);
  res.json({ message: "Client and associated models updated successfully" });
});

const deleteClient = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await clientRepository.deleteClient(id);
  res.json({ message: "Client and associated models deleted successfully" });
});

const createClient = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const client = await clientRepository.createClient(body);
  const { id } = client;
  res.json(id);
});

module.exports = {
  getClients,
  getClientById,
  patchClient,
  deleteClient,
  createClient,
};
