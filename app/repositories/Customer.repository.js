const { Customer, CustomerService } = require("../db/models");
const models = require("../db/models");
const { GET_CUSTOMER_QUERY } = require("./queries");
const {
  changeInputToModelName,
  changeToSingular,
} = require("../utils/Parser.utils");
const { Op } = require("sequelize");

const createCustomer = async (body) => {
  const t = await models.sequelize.transaction();
  try {
    // Create the customer
    const customer = await Customer.create(body, { transaction: t });

    const associations = Customer.associations;

    for (const association of Object.keys(associations)) {
      if (body[association]) {
        const modelName = changeInputToModelName(association);
        const Model = models[modelName];

        for (const associatedData of body[association]) {
          if (association === "services") {
            // For many-to-many relationships
            await CustomerService.create(
              {
                customer_id: customer.id,
                service_id: associatedData,
              },
              { transaction: t }
            );
          } else {
            // For one-to-many relationships
            await Model.create(
              {
                ...associatedData,
                customer_id: customer.id,
              },
              { transaction: t }
            );
          }
        }
      }
    }

    await t.commit();
    return customer;
  } catch (error) {
    await t.rollback();
    console.error("Error creating customer:", error);
    throw error;
  }
};

const getCustomers = async () => {
  return await Customer.findAll(GET_CUSTOMER_QUERY);
};

const getCustomerById = async (id) => {
  return await Customer.findByPk(id, GET_CUSTOMER_QUERY);
};

const patchCustomer = async (id, body) => {
  const t = await models.sequelize.transaction();

  try {
    const customer = await Customer.findByPk(id, { transaction: t });
    if (!customer) {
      throw new Error("Customer not found");
    }

    await customer.update(body, { transaction: t });

    const associations = Customer.associations;

    for (const association of Object.keys(associations)) {
      if (body[association]) {
        const modelName = changeInputToModelName(association);
        const Model = models[modelName];

        for (const associatedData of body[association]) {
          if (association === "services") {
            await CustomerService.update(
              { service_id: associatedData.service_id },
              {
                where: { customer_id: id, service_id: associatedData.id },
                transaction: t,
              }
            );
          } else {
            await Model.update(associatedData, {
              where: { id: associatedData.id },
              transaction: t,
            });
          }
        }
      }
    }

    await t.commit();
    return customer;
  } catch (error) {
    await t.rollback();
    console.error("Error patching customer:", error);
    throw error;
  }
};

const putCustomer = async (id, body) => {
  const t = await models.sequelize.transaction();

  try {
    const customer = await Customer.findByPk(id, { transaction: t });
    if (!customer) {
      throw new Error("Customer not found");
    }

    await customer.update(body, { transaction: t });

    const associations = Customer.associations;

    for (const association of Object.keys(associations)) {
      if (body[association]) {
        const modelName = changeInputToModelName(association);
        const Model = models[modelName];

        // Delete existing associations
        if (association === "services") {
          await CustomerService.destroy({
            where: { customer_id: id },
            transaction: t,
          });
        } else {
          await Model.destroy({
            where: { customer_id: id },
            transaction: t,
          });
        }

        // Create new associations
        for (const associatedData of body[association]) {
          if (association === "services") {
            await CustomerService.create(
              {
                customer_id: id,
                service_id: associatedData,
              },
              { transaction: t }
            );
          } else {
            await Model.create(
              {
                ...associatedData,
                customer_id: id,
              },
              { transaction: t }
            );
          }
        }
      }
    }

    await t.commit();
    return customer;
  } catch (error) {
    await t.rollback();
    console.error("Error putting customer:", error);
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
