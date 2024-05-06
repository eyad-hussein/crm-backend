const { accountRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getAccounts = asyncHandler(async (req, res, next) => {
  res.json(await accountRepository.getAccounts());
});

const getAccountById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await accountRepository.getAccountById(id));
});

const patchAccount = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await accountRepository.patchAccount(id, body);
  res.json({ message: "Account and associated models updated successfully" });
});

const deleteAccount = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await accountRepository.deleteAccount(id);
  res.json({ message: "Account and associated models deleted successfully" });
});

const createAccount = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const account = await accountRepository.createAccount(body);
  const { id } = account;
  res.json(id);
});

module.exports = {
  getAccounts,
  getAccountById,
  patchAccount,
  deleteAccount,
  createAccount,
};
