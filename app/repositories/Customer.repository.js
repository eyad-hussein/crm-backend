const { Customer, CustomerService } = require("../db/models");
const models = require("../db/models");
const { GET_CUSTOMER_QUERY } = require("./queries");
const { changeInputToModelName } = require("../utils/Parser.utils");
const { Op } = require("sequelize");
const logger = require("../utils/Logger");
const { searchService, filterService, sortService } = require("../services");

const createCustomer = async (body) => {
  try {
    const t = await models.sequelize.transaction();
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
  logger.info("filtering customers, repository");

  logger.info("queries", { queries });

  const filterCriteria = await filterService.createFilterCriteria(queries);

  logger.info("performing filter query");

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

  return customers;
};

const searchForCustomer = async (query) => {
  logger.info("searching for customer, repository");
  logger.info("query", { query });
  let { query: q, status, searchFilters } = query;

  const searchCriteria = await searchService.createSearchCriteria(
    searchFilters,
    q
  );

  const customers = await Customer.findAll({
    where: searchCriteria,
  });

  logger.info("customers", { customers });

  if (status !== undefined) {
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

const sortCustomers = async (body) => {
  try {
    logger.info("sorting customers, repository");
    const { customerIds, sortParams } = body;

    const query = sortService.buildQuery(customerIds, sortParams);

    const [customers, metadata] = await models.sequelize.query(query);

    const sortedIds = customers.map((customer) => customer.customer_id);
    logger.info({ message: "sortedIds", sortedIds });
    return sortedIds;
  } catch (error) {
    logger.error("Error sorting customers:");
    throw error;
  }
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
  sortCustomers,
};
