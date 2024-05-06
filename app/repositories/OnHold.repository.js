const { OnHold } = require("../db/models");

const createOnHold = async (body) => {
  return await OnHold.create(body);
};

const getOnHolds = async () => {
  return await OnHold.findAll();
};

const getOnHoldById = async () => {
  return await OnHold.findByPk(id);
};

const deleteOnHoldByCustomerId = async (customerId) => {
  return await OnHold.destroy({
    where: {
      customer_id: customerId,
    },
  });
};

module.exports = {
  createOnHold,
  getOnHolds,
  getOnHoldById,
  deleteOnHoldByCustomerId,
};
