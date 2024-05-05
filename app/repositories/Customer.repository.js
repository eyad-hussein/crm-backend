const {
  Customer,
  CustomerPhoneNumber,
  User,
  Account,
  Service,
} = require("../db/models");
const models = require("../db/models");
const { changeInputToModelName } = require("../utils/Parser.utils");

const GET_CUSTOMER_QUERY = {
  attributes: ["id", "first_name", "last_name", "email", "priority"],
  include: [
    {
      model: CustomerPhoneNumber,
      as: "customer_phone_numbers",
    },
    {
      model: User,
      attributes: ["id", "first_name", "last_name"],
      as: "user",
    },
    { model: Account, as: "account" },
    { model: Service, as: "services" },
  ],
};

const createCustomer = async (body) => {
  const customer = await Customer.create(body);
  return customer;
};

const getCustomers = async (id) => {
  return await Customer.findAll(GET_CUSTOMER_QUERY);
};

const getCustomerById = async (id) => {
  return await Customer.findByPk(id, GET_CUSTOMER_QUERY);
};

const patchCustomer = async (id, body) => {
  const customer = await Customer.findByPk(id);

  await customer.update(body);

  const associations = Customer.associations;

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

const deleteCustomer = async (id) => {
  await Customer.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getCustomers,
  getCustomerById,
  patchCustomer,
  deleteCustomer,
  createCustomer,
};
