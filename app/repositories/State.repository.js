const logger = require("../utils/Logger");
const db = require("../db/models");
const { State } = require("../db/models");

const createState = async (body) => {
  try {
    logger.info("Creating state, repository");
    const t = await db.sequelize.transaction();
    const state = await State.create(body, { transaction: t });
    t.commit();
    return state;
  } catch (error) {
    logger.error("Error creating state");
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

const getStateById = async (id) => {
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
