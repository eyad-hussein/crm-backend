const { Industry } = require("../db/models");

const createIndustry = async (body) => {
  const industry = await Industry.create(body);
  return industry;
};

const getIndustries = async () => {
  return await Industry.findAll();
};

const getIndustryById = async (id) => {
  return await Industry.findByPk(id);
};

const patchIndustry = async (id, body) => {
  const industry = await Industry.findByPk(id);

  await industry.update(body);
};

const deleteIndustry = async (id) => {
  await Industry.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getIndustries,
  getIndustryById,
  patchIndustry,
  deleteIndustry,
  createIndustry,
};
