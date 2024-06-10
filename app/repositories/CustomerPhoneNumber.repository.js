const logger = require("../utils/Logger");
const { CustomerPhoneNumber } = require("../db/models");

const createCustomerPhoneNumber = async (body) => {
  try {
    logger.info("Creating customerPhoneNumber, repository");
    return await CustomerPhoneNumber.create(body);
  } catch (error) {
    throw error;
  }
};

const getCustomerPhoneNumbers = async () => {
  try {
    logger.info("Getting customerPhoneNumbers, repository");

    return await CustomerPhoneNumber.findAll();
  } catch (error) {
    throw error;
  }
};

const getCustomerPhoneNumbersByFilters = async (filterOptions) => {
  return await CustomerPhoneNumber.findAll({
    where: filterOptions,
  });
};

const getCustomerPhoneNumberById = async () => {
  try {
    logger.info("Getting customerPhoneNumber by id, repository");
    return await CustomerPhoneNumber.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteCustomerPhoneNumber = async (customerPhoneNumberId) => {
  try {
    logger.info("Deleting customerPhoneNumber by customer id, repository");

    return await CustomerPhoneNumber.destroy({
      where: {
        id: customerPhoneNumberId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCustomerPhoneNumber,
  getCustomerPhoneNumbers,
  getCustomerPhoneNumberById,
  deleteCustomerPhoneNumber,
  getCustomerPhoneNumbersByFilters,
};
