const { Customer } = require("../db/models");
const models = require("../db/models");
const { GET_CUSTOMER_QUERY } = require("./queries");
const {
  changeInputToModelName,
  changeToSingular,
} = require("../utils/Parser.utils");
const { Op } = require("sequelize");

const createCustomer = async (body) => {
  console.log("body", body);

  const customer = await Customer.create(body);

  const associations = Customer.associations;

  for (const association of Object.keys(associations)) {
    if (body[association]) {
      const modelName = changeInputToModelName(association);

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

const filterCustomers = async (queries) => {
  console.log("filtering customers, repository");

  console.log("queries", queries);

  const filterCriteria = {};

  if (queries.first_name)
    filterCriteria.first_name = { [Op.substring]: queries.first_name };
  if (queries.last_name)
    filterCriteria.last_name = { [Op.substring]: queries.last_name };
  if (queries.email) filterCriteria.email = { [Op.substring]: queries.email };
  if (queries.title) filterCriteria.title = { [Op.substring]: queries.title };
  if (queries.priority) filterCriteria.priority = queries.priority;
  if (queries.lead_source) filterCriteria.lead_source = queries.lead_source;
  if (queries.salutation) filterCriteria.salutation = queries.salutation;

  if (queries.status) {
    const status = changeToSingular(queries.status);
    filterCriteria.status = status;
  }
  const customers = await Customer.findAll({
    where: filterCriteria,
  });

  if (queries.status != undefined) {
    const customersIds = customers.map((customer) => customer.id);

    return await models[changeInputToModelName(queries.status)].findAll({
      where: {
        customer_id: {
          [Op.in]: customersIds,
        },
      },
      include: {
        model: Customer,
        as: "customer",
        ...GET_CUSTOMER_QUERY,
      },
    });
  }

  return await Customer.findAll({
    where: filterCriteria,
  });
};

const searchForCustomer = async (query) => {
  console.log("searching for customer, repository");

  let { query: q, status } = query;

  const [firstName, lastName] = q.split(" ");

  const searchCriteria = {
    [Op.or]: [
      {
        first_name: {
          [Op.substring]: firstName.toLowerCase(),
        },
      },
      lastName
        ? {
            last_name: {
              [Op.substring]: lastName.toLowerCase(),
            },
          }
        : {
            last_name: {
              [Op.substring]: firstName.toLowerCase(),
            },
          },
    ],
  };

  const customers = await Customer.findAll({
    where: searchCriteria,
  });

  if (status != undefined) {
    const customersIds = customers.map((customer) => customer.id);

    return await models[changeInputToModelName(status)].findAll({
      where: {
        customer_id: {
          [Op.in]: customersIds,
        },
      },
      include: {
        model: Customer,
        as: "customer",
        ...GET_CUSTOMER_QUERY,
      },
    });
  }

  return customers;
};

module.exports = {
  getCustomers,
  getCustomerById,
  patchCustomer,
  putCustomer,
  deleteCustomer,
  createCustomer,
  searchForCustomer,
  filterCustomers,
};
