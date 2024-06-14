const { User } = require("../db/models");
const { GET_USER_QUERY } = require("./queries");
const models = require("../db/models");
const logger = require("../utils/Logger");

const createUser = async (body) => {
  try {
    logger.info("Creating user, repository");
    const t = await models.sequelize.transaction();
    const user = await User.create(body, { transaction: t });
    await t.commit();
    return user;
  } catch (error) {
    logger.error("Error creating user, repository");
    throw error;
  }
};

const getUsers = async () => {
  return await User.findAll();
};

const getUsersByFilters = async (filterOptions) => {
  return await User.findAll({
    where: filterOptions,
  });
};

const getUserById = async (id) => {
  return await User.findByPk(id, GET_USER_QUERY);
};

const patchUser = async (id, body) => {
  try {
    logger.info("Patching user, repository");

    const t = await models.sequelize.transaction();

    const user = await User.findByPk(id, { transaction: t });
    await user.update(body, { transaction: t });
    await t.commit();
  } catch (error) {
    logger.error("Error patching user, repository");
    throw error;
  }
};

const deleteUser = async (id) => {
  await User.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getUsers,
  getUserById,
  patchUser,
  deleteUser,
  createUser,
  getUsersByFilters,
};
