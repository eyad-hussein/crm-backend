const { Country } = require("../db/models");
const logger = require("../utils/Logger");
const db = require("../db/models");

const createCountry = async (body) => {
  try {
    logger.info("Creating country, repository");
    const t = await db.sequelize.transaction();
    const country = await Country.create(body, { transaction: t });
    t.commit();
    return country;
  } catch (error) {
    logger.error("Error creating country");
    throw error;
  }
};

const getCountries = async () => {
  return await Country.findAll();
};

const getCountriesByFilters = async (filterOptions) => {
  logger.info("Getting countries by filters, repository");

  return await Country.findAll({
    where: filterOptions,
  });
};

const getCountryById = async (id) => {
  return await Country.findByPk(id);
};

const patchCountry = async (id, body) => {
  const country = await Country.findByPk(id);

  await country.update(body);
};

const deleteCountry = async (id) => {
  await Country.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getCountries,
  getCountryById,
  patchCountry,
  deleteCountry,
  createCountry,
  getCountriesByFilters,
};
