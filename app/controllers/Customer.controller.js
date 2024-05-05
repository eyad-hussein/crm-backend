const { CustomerStateType } = require("../enums");
const { customerRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getCustomers = asyncHandler(async (req, res, next) => {
  res.json(await customerRepository.getCustomers());
});

const getCustomerById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await customerRepository.getCustomerById(id));
});

const patchCustomer = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await customerRepository.patchCustomer(id, body);
  res.json({ message: "Customer and associated models updated successfully" });
});

const deleteCustomer = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await customerRepository.deleteCustomer(id);
  res.json({ message: "Customer and associated models deleted successfully" });
});

const createCustomer = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const customer = await customerRepository.createCustomer(body);
  const { id } = customer;
  res.json(id);
});

const patchCustomerState = asyncHandler(async (req, res, next) => {
  const { id, state } = req.params;

  switch (state) {
    case CustomerStateType.CUSTOMER:
      break;
  }
});

module.exports = {
  getCustomers,
  getCustomerById,
  patchCustomer,
  deleteCustomer,
  createCustomer,
  patchCustomerState,
};
