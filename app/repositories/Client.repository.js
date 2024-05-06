const { Client } = require("../db/models");

const createClient = async (body) => {
  return await Client.create(body);
};

const getClients = async () => {
  return await Client.findAll();
};

const getClientById = async () => {
  return await Client.findByPk(id);
};

const deleteClientByCustomerId = async (customerId) => {
  return await Client.destroy({
    where: {
      customer_id: customerId,
    },
  });
};

module.exports = {
  createClient,
  getClients,
  getClientById,
  deleteClientByCustomerId,
};
