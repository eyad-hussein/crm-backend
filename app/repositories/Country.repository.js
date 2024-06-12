const { Country } = require("../db/models");
const logger = require("../utils/Logger");

const createCountry = async (body) => {
  const country = await Country.create(body);
  return country;
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
