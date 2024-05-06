const { Prospect } = require("../db/models");

const createProspect = async (body) => {
  return await Prospect.create(body);
};

const getProspects = async () => {
  return await Prospect.findAll();
};

const getProspectById = async () => {
  return await Prospect.findByPk(id);
};

const deleteProspectByCustomerId = async (customerId) => {
  return await Prospect.destroy({
    where: {
      customer_id: customerId,
    },
  });
};

module.exports = {
  createProspect,
  getProspects,
  getProspectById,
  deleteProspectByCustomerId,
};
