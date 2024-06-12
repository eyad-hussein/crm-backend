const logger = require("../utils/Logger");
const { City } = require("../db/models");

const createCity = async (body) => {
  try {
    logger.info("Creating city, repository");
    return await City.create(body);
  } catch (error) {
    throw error;
  }
};

const getCities = async () => {
  try {
    logger.info("Getting cities, repository");

    return await City.findAll();
  } catch (error) {
    throw error;
  }
};

const getCitiesByStateId = async (stateId) => {
  try {
    logger.info("Getting cities by state id, repository");

    return await City.findAll({
      where: {
        state_id: stateId,
      },
    });
  } catch (error) {
    throw error;
  }
};

const getCityById = async () => {
  try {
    logger.info("Getting city by id, repository");
    return await City.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteCity = async (cityId) => {
  try {
    logger.info("Deleting city by customer id, repository");

    return await City.destroy({
      where: {
        id: cityId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCity,
  getCities,
  getCityById,
  deleteCity,
  getCitiesByStateId,
};
