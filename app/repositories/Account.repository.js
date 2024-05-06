const { Account, Customer } = require("../db/models");
const models = require("../db/models");
const { changeInputToModelName } = require("../utils/Parser.utils");

const GET_ACCOUNT_QUERY = {
  attributes: ["id", "account_name", "industry"],
  include: [
    {
      model: Customer,
      attributes: ["id", "first_name", "last_name"],
      as: "customer",
    },
  ],
};

const createAccount = async (body) => {
  const account = await Account.create(body);
  return account;
};

const getAccounts = async () => {
  return await Account.findAll(GET_ACCOUNT_QUERY);
};

const getAccountById = async (id) => {
  return await Account.findByPk(id, GET_ACCOUNT_QUERY);
};

const patchAccount = async (id, body) => {
  const account = await Account.findByPk(id);

  await account.update(body);

  const associations = Account.associations;

  for (const association of Object.keys(associations)) {
    if (body[association]) {
      const modelName = changeInputToModelName(association);
      await models[modelName].update(body[association], {
        where: {
          id: body[association]["id"],
        },
      });
    }
  }
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
