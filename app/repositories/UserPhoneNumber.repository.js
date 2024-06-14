const logger = require("../utils/Logger");
const db = require("../db/models");
const { UserPhoneNumber } = require("../db/models");

const createUserPhoneNumber = async (body) => {
  try {
    logger.info("Creating userPhoneNumber, repository");
    const t = await db.sequelize.transaction();
    const userPhoneNumber = await UserPhoneNumber.create(body, {
      transaction: t,
    });
    await t.commit();
    return userPhoneNumber;
  } catch (error) {
    throw error;
  }
};

const getUserPhoneNumbers = async () => {
  try {
    logger.info("Getting userPhoneNumbers, repository");

    return await UserPhoneNumber.findAll();
  } catch (error) {
    throw error;
  }
};

const getUserPhoneNumbersByFilters = async (filterOptions) => {
  return await UserPhoneNumber.findAll({
    where: filterOptions,
  });
};

const getUserPhoneNumberById = async (id) => {
  try {
    logger.info("Getting userPhoneNumber by id, repository");
    return await UserPhoneNumber.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteUserPhoneNumber = async (userPhoneNumberId) => {
  try {
    logger.info("Deleting userPhoneNumber by user id, repository");

    return await UserPhoneNumber.destroy({
      where: {
        id: userPhoneNumberId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUserPhoneNumber,
  getUserPhoneNumbers,
  getUserPhoneNumberById,
  deleteUserPhoneNumber,
  getUserPhoneNumbersByFilters,
};
