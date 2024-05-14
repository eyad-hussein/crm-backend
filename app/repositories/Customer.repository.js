const { Customer } = require("../db/models");
const models = require("../db/models");
const { GET_CUSTOMER_QUERY } = require("./queries");
const { changeInputToModelName } = require("../utils/Parser.utils");

const createCustomer = async (body) => {
  const customer = await Customer.create(body);
  return customer;
};

const getCustomers = async () => {
  return await Customer.findAll(GET_CUSTOMER_QUERY);
};

const getCustomerById = async (id) => {
  return await Customer.findByPk(id, GET_CUSTOMER_QUERY);
};

const patchCustomer = async (id, body) => {
  try {
    console.log("patching customer, repository");
    const customer = await Customer.findByPk(id);
    console.log(body, id);
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
  } catch (error) {
    throw error;
  }
};

const putCustomer = async (id, body) => {
  const customer = await Customer.findByPk(id);

  await customer.update(body);
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
  putCustomer,
  deleteCustomer,
  createCustomer,
};
