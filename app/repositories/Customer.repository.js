const { Customer, CustomerService } = require("../db/models");
const models = require("../db/models");
const { GET_CUSTOMER_QUERY } = require("./queries");
const { changeInputToModelName } = require("../utils/Parser.utils");
const { Op } = require("sequelize");
const logger = require("../utils/Logger");
const { searchService, filterService, sortService } = require("../services");
const { singularize } = require("sequelize/lib/utils");

const getCustomers = async () => {
  return await Customer.findAll(GET_CUSTOMER_QUERY);
};

const getCustomerById = async (id) => {
  return await Customer.findByPk(id, GET_CUSTOMER_QUERY);
};

const createCustomer = async (body, transaction) => {
  try {
    const t = transaction || (await models.sequelize.transaction());

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
    console.error("Error creating customer:", error);
    throw error;
  }
};

const patchCustomer = async (id, body) => {
  try {
    logger.info("Patching customer status, repository");
    const t = await models.sequelize.transaction();
    const customer = await Customer.findByPk(id, { transaction: t });
    if (!customer) {
      throw new Error("Customer not found");
    }
    body.status = singularize(body.status);
    await customer.update(body, { transaction: t });

    const associations = Customer.associations;

    for (const association of Object.keys(associations)) {
      if (body[association]) {
        const modelName = changeInputToModelName(association);
        const Model = models[modelName];

        if (association === "services") {
          await _updateCustomerServices(customer.id, body[association], t);
        } else {
          for (const associatedData of body[association]) {
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
    logger.error("Error patching customer");
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

    await customer.destroy({ transaction: t });

    const newCustomer = await createCustomer(body, t);
    await t.commit();

    return newCustomer;
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

  const searchCriteria = await searchService.createCustomerSearchCriteria(
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

const _updateCustomerServices = async (customerId, services, transaction) => {
  const currentServices = await CustomerService.findAll({
    where: { customer_id: customerId },
    transaction: transaction,
  });

  const currentServiceIds = currentServices.map(
    (service) => service.service_id
  );

  const servicesToAdd = services.filter(
    (serviceId) => !currentServiceIds.includes(serviceId)
  );
  const servicesToRemove = currentServiceIds.filter(
    (serviceId) => !services.includes(serviceId)
  );

  for (const serviceId of servicesToAdd) {
    await CustomerService.create(
      { customer_id: customerId, service_id: serviceId },
      { transaction: transaction }
    );
  }

  await CustomerService.destroy({
    where: { customer_id: customerId, service_id: servicesToRemove },
    transaction: transaction,
  });
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
