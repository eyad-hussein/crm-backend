const logger = require("../utils/Logger");

const { Contact, Customer } = require("../db/models");
const { GET_CUSTOMER_QUERY } = require("./queries");

const createContact = async (body) => {
  try {
    logger.info("Creating contact, repository");
    return await Contact.create(body);
  } catch (error) {
    throw error;
  }
};

const getContacts = async () => {
  try {
    logger.info("Getting contacts, repository");

    return await Contact.findAll({
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

const getContactById = async () => {
  try {
    logger.info("Getting contact by id, repository");
    return await Contact.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteContactByCustomerId = async (customerId) => {
  try {
    logger.info("Deleting contact by customer id, repository");
    return await Contact.destroy({
      where: {
        customer_id: customerId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  deleteContactByCustomerId,
};
