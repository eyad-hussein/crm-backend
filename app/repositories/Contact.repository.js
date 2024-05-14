const { Contact } = require("../db/models");

const createContact = async (body) => {
  try {
    console.log("Creating contact, repository");
    return await Contact.create(body);
  } catch (error) {
    throw error;
  }
};

const getContacts = async () => {
  try {
    console.log("Getting contacts, repository");
    return await Contact.findAll();
  } catch (error) {
    throw error;
  }
};

const getContactById = async () => {
  try {
    console.log("Getting contact by id, repository");
    return await Contact.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteContactByCustomerId = async (customerId) => {
  try {
    console.log("Deleting contact by customer id, repository");
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