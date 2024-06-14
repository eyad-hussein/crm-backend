const { Industry } = require("../db/models");
const logger = require("../utils/Logger");
const db = require("../db/models");

const createIndustry = async (body) => {
  try {
    logger.info("Creating industry, repository");
    const t = await db.sequelize.transaction();
    const industry = await Industry.create(body, { transaction: t });
    t.commit();
    return industry;
  } catch (error) {
    logger.error("Error creating industry");
    throw error;
  }
};

const getIndustries = async () => {
  return await Industry.findAll();
};

const getIndustriesByFilters = async (filterOptions) => {
  return await Industry.findAll({
    where: filterOptions,
  });
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
  getIndustriesByFilters,
};
