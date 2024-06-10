const { Customer, CustomerService } = require("../db/models");
const models = require("../db/models");
const { GET_CUSTOMER_QUERY } = require("./queries");
const {
  changeInputToModelName,
  changeToSingular,
} = require("../utils/Parser.utils");
const { Op, where } = require("sequelize");
const logger = require("../utils/Logger");

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
  logger.info("filtering customers, repository");

  logger.info("queries", { queries });

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
  logger.info("searching for customer, repository");
  logger.info("query", { query });
  let { query: q, status, searchFilters } = query;
  let customers = [];

  searchFilters = searchFilters != "undefined" ? searchFilters.split(",") : [];

  logger.info("search filters after", { searchFilters });

  if (searchFilters.length) {
    const searchCriteria = {
      [Op.or]: [
        searchFilters.includes("name") && { name: { [Op.substring]: q } },
        searchFilters.includes("follow_up_date") && {
          follow_up_date: { [Op.substring]: q },
        },
        searchFilters.includes("lead_source") && {
          lead_source: { [Op.substring]: q },
        },
        searchFilters.includes("email") && { email: { [Op.substring]: q } },
      ],
    };

    const include = [];

    if (searchFilters.includes("industry")) {
      const industries = await models.Industry.findAll({
        where: { industry_name: { [Op.substring]: q } },
      });
      const industryIds = industries.map((industry) => industry.id);

      searchCriteria[Op.or].push({
        industry_id: {
          [Op.in]: industryIds,
        },
      });
    }

    if (searchFilters.includes("phone_number")) {
      const phoneNumbers = await models.CustomerPhoneNumber.findAll({
        where: { phone_number: { [Op.substring]: q } },
      });
      const customerIds = phoneNumbers.map(
        (phoneNumber) => phoneNumber.customer_id
      );

      searchCriteria[Op.or].push({
        id: {
          [Op.in]: customerIds,
        },
      });
    }

    if (searchFilters.includes("country")) {
      const countries = await models.Country.findAll({
        where: { country_name: { [Op.substring]: q } },
      });

      const countriesIds = countries.map((country) => country.id);

      const addresses = await models.Address.findAll({
        where: {
          country_id: {
            [Op.in]: countriesIds,
          },
        },
      });

      const customerIds = addresses.map((address) => address.customer_id);

      searchCriteria[Op.or].push({
        id: {
          [Op.in]: customerIds,
        },
      });
    }

    if (searchFilters.includes("user")) {
      const users = await models.User.findAll({
        where: {
          [Op.or]: [
            { first_name: { [Op.substring]: q } },
            { last_name: { [Op.substring]: q } },
          ],
        },
      });

      const userIds = users.map((user) => user.id);

      searchCriteria[Op.or].push({
        user_id: {
          [Op.in]: userIds,
        },
      });
    }

    logger.info("search criteria", { searchCriteria });
    logger.info("include", { include });

    customers = await Customer.findAll({
      where: searchCriteria,
    });
  } else {
    customers = await Customer.findAll({
      where: {
        name: { [Op.substring]: q },
      },
    });
  }

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
