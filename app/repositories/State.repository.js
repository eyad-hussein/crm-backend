const { State } = require("../db/models");

const createState = async (body) => {
  try {
    console.log("Creating state, repository");
    return await State.create(body);
  } catch (error) {
    throw error;
  }
};

const getStates = async () => {
  try {
    console.log("Getting states, repository");

    return await State.findAll();
  } catch (error) {
    throw error;
  }
};

const getStateById = async () => {
  try {
    console.log("Getting state by id, repository");
    return await State.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteState = async (stateId) => {
  try {
    console.log("Deleting state by customer id, repository");

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
  getStateById,
  deleteState,
};
