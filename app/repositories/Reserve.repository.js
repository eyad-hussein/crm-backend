const { Reserve } = require("../db/models");

const createReserve = async (body) => {
  return await Reserve.create(body);
};

const getReserves = async () => {
  return await Reserve.findAll();
};

const getReserveById = async () => {
  return await Reserve.findByPk(id);
};

const deleteReserveByCustomerId = async (customerId) => {
  return await Reserve.destroy({
    where: {
      customer_id: customerId,
    },
  });
};

module.exports = {
  createReserve,
  getReserves,
  getReserveById,
  deleteReserveByCustomerId,
};
