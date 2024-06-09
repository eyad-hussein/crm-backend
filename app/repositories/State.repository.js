const logger = require("../utils/Logger");

const { State } = require("../db/models");

const createState = async (body) => {
  try {
    logger.info("Creating state, repository");
    return await State.create(body);
  } catch (error) {
    throw error;
  }
};

const getStates = async () => {
  try {
    logger.info("Getting states, repository");

    return await State.findAll();
  } catch (error) {
    throw error;
  }
};

const getStatesByCountryId = async (countryId) => {
  try {
    logger.info("Getting states by country id, repository");

    return await State.findAll({
      where: {
        country_id: countryId,
      },
    });
  } catch (error) {
    throw error;
  }
};

const getStateById = async () => {
  try {
    logger.info("Getting state by id, repository");
    return await State.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteState = async (stateId) => {
  try {
    logger.info("Deleting state by customer id, repository");

    return await State.destroy({
      where: {
        id: stateId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createState,
  getStates,
  getStatesByCountryId,
  getStateById,
  deleteState,
};
