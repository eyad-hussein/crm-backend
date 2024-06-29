const logger = require("../utils/Logger");

const { FollowUp, Customer } = require("../db/models");

const { GET_CUSTOMER_QUERY } = require("./queries");

const createFollowUp = async (body) => {
  try {
    logger.info("Creating follow up, repository");
    return await FollowUp.create(body);
  } catch (error) {
    throw error;
  }
};

const getFollowUps = async () => {
  try {
    logger.info("Getting followUps, repository");

    return await FollowUp.findAll({
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

const getFollowUpById = async () => {
  try {
    logger.info("Getting follow up by id, repository");
    return await FollowUp.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteFollowUpByCustomerId = async (customerId) => {
  try {
    logger.info("Deleting follow up by customer id, repository");
    return await FollowUp.destroy({
      where: {
        customer_id: customerId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createFollowUp,
  getFollowUps,
  getFollowUpById,
  deleteFollowUpByCustomerId,
};
