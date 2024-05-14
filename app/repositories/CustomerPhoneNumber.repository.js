const { CustomerPhoneNumber } = require("../db/models");

const createCustomerPhoneNumber = async (body) => {
  try {
    console.log("Creating customerPhoneNumber, repository");
    return await CustomerPhoneNumber.create(body);
  } catch (error) {
    throw error;
  }
};

const getCustomerPhoneNumbers = async () => {
  try {
    console.log("Getting customerPhoneNumbers, repository");

    return await CustomerPhoneNumber.findAll();
  } catch (error) {
    throw error;
  }
};

const getCustomerPhoneNumberById = async () => {
  try {
    console.log("Getting customerPhoneNumber by id, repository");
    return await CustomerPhoneNumber.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteCustomerPhoneNumber = async (customerPhoneNumberId) => {
  try {
    console.log("Deleting customerPhoneNumber by customer id, repository");

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
};
