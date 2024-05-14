const { customerPhoneNumberRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getCustomerPhoneNumbers = asyncHandler(async (req, res, next) => {
  res.json(await customerPhoneNumberRepository.getCustomerPhoneNumbers());
});

const getCustomerPhoneNumberById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await customerPhoneNumberRepository.getCustomerPhoneNumberById(id));
});

const patchCustomerPhoneNumber = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await customerPhoneNumberRepository.patchCustomerPhoneNumber(id, body);
  res.json({
    message: "CustomerPhoneNumber and associated models updated successfully",
  });
});

const deleteCustomerPhoneNumber = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await customerPhoneNumberRepository.deleteCustomerPhoneNumber(id);
  res.json({
    message: "CustomerPhoneNumber and associated models deleted successfully",
  });
});

const createCustomerPhoneNumber = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const customerPhoneNumber =
    await customerPhoneNumberRepository.createCustomerPhoneNumber(body);
  const { id } = customerPhoneNumber;
  res.json(id);
});

module.exports = {
  getCustomerPhoneNumbers,
  getCustomerPhoneNumberById,
  patchCustomerPhoneNumber,
  deleteCustomerPhoneNumber,
  createCustomerPhoneNumber,
};
