const { User, Customer } = require("../db/models");
const { GET_USER_QUERY } = require("./queries");
const models = require("../db/models");
const logger = require("../utils/Logger");
const { changeInputToModelName } = require("../utils/Parser.utils");
const { customerRepository } = require(".");

const createUser = async (body) => {
  try {
    logger.info("Creating user, repository");
    const t = await models.sequelize.transaction();
    const user = await User.create(body, { transaction: t });
    const associations = User.associations;
    await _dealWithUserAssociations(body, associations, "create", t, user.id);

    if (body.customer_id) {
      await Customer.update(
        {
          user_id: user.id,
        },
        {
          where: {
            id: body.customer_id,
          },
          transaction: t,
        }
      );
    }

    await t.commit();
    return user;
  } catch (error) {
    logger.error("Error creating user, repository");
    throw error;
  }
};

const _dealWithUserAssociations = async (
  body,
  associations,
  methodType,
  t,
  userId
) => {
  for (const association of Object.keys(associations)) {
    if (body[association]) {
      const modelName = changeInputToModelName(association);
      const Model = models[modelName];

      switch (methodType) {
        case "create":
          for (const associatedData of body[association]) {
            await Model.create(
              {
                ...associatedData,
                user_id: userId,
              },
              { transaction: t }
            );
          }
          break;
        case "update":
          for (const associatedData of body[association]) {
            await Model.update(
              {
                ...associatedData,
              },
              {
                where: {
                  user_id: userId,
                },
                transaction: t,
              }
            );
          }
          break;
      }
    }
  }
};

const getUsers = async () => {
  return await User.findAll(GET_USER_QUERY);
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
