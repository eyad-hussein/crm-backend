const { contactRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getContacts = asyncHandler(async (req, res, next) => {
  res.json(await contactRepository.getContacts());
});

const getContactById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await contactRepository.getContactById(id));
});

const patchContact = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await contactRepository.patchContact(id, body);
  res.json({ message: "Contact and associated models updated successfully" });
});

const deleteContact = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await contactRepository.deleteContact(id);
  res.json({ message: "Contact and associated models deleted successfully" });
});

const createContact = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const contact = await contactRepository.createContact(body);
  const { id } = contact;
  res.json(id);
});

module.exports = {
  getContacts,
  getContactById,
  patchContact,
  deleteContact,
  createContact,
};
