const { Account, Customer } = require("../db/models");
const models = require("../db/models");
const { changeInputToModelName } = require("../utils/Parser.utils");

const createAccount = async (body) => {
  const account = await Account.create(body);
  return account;
};

const getAccounts = async () => {
  return await Account.findAll();
};

const getAccountById = async (id) => {
  return await Account.findByPk(id);
};

const patchAccount = async (id, body) => {
  const account = await Account.findByPk(id);

  await account.update(body);
};

const deleteAccount = async (id) => {
  await Account.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getAccounts,
  getAccountById,
  patchAccount,
  deleteAccount,
  createAccount,
};
