const logger = require("../utils/Logger");

const { Prospect, Customer } = require("../db/models");
const customerRepository = require("./Customer.repository");

const { GET_CUSTOMER_QUERY } = require("./queries");
const createProspect = async (body) => {
  try {
    logger.info("Creating prospect, repository");
    return await Prospect.create(body);
  } catch (error) {
    throw error;
  }
};

const getProspects = async () => {
  try {
    logger.info("Getting prospects, repository");

    return await Prospect.findAll({
      include: [
        {
          model: Customer,
          as: "customer",
          ...GET_CUSTOMER_QUERY,
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

const getProspectById = async () => {
  try {
    logger.info("Getting prospect by id, repository");
    return await Prospect.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteProspectByCustomerId = async (customerId) => {
  try {
    logger.info("Deleting prospect by customer id, repository");

    return await Prospect.destroy({
      where: {
        customer_id: customerId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProspect,
  getProspects,
  getProspectById,
  deleteProspectByCustomerId,
};
