const { Customer } = require("../db/models");
const models = require("../db/models");
const { GET_CUSTOMER_QUERY } = require("./queries");
const { changeInputToModelName } = require("../utils/Parser.utils");

const createCustomer = async (body) => {
  console.log("body", body);

  const customer = await Customer.create(body);

  const associations = Customer.associations;

  for (const association of Object.keys(associations)) {
    if (body[association]) {
      const modelName = changeInputToModelName(association);

      console.log("modelName", modelName);
      console.log("body[association]", body[association]);
      console.log("association", association);
      const modelInstance = await models[modelName].create(body[association]);
      await customer.update(
        {
          [`${association}_id`]: modelInstance.id,
        },
        {
          where: {
            id: customer.id,
          },
        }
      );
    }
  }

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
  try {
    console.log("putting customer, repository");
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
  } catch (error) {
    throw error;
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
  putCustomer,
  deleteCustomer,
  createCustomer,
};
