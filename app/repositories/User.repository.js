const { User, Customer, UserRole } = require("../db/models");
const { GET_USER_QUERY } = require("./queries");
const models = require("../db/models");
const logger = require("../utils/Logger");
const { changeInputToModelName } = require("../utils/Parser.utils");
const { Op } = require("sequelize");

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

const getUsers = async () => {
  return await User.findAll(GET_USER_QUERY);
};

const getUsersByFilters = async (filterOptions) => {
  return await User.findAll({
    where: filterOptions,
  });
};

const getUserByFilters = async (filterOptions, options) => {
  try {
    logger.info("Getting user by filters, repository");
    return await User.findOne({
      where: filterOptions,
      ...options,
    });
  } catch (error) {
    logger.error("Error getting user by filters, repository");
    throw error;
  }
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
  try {
    logger.info("Deleting user, repository");
    const t = await models.sequelize.transaction();
    await User.destroy({
      where: {
        id: id,
      },
      transaction: t,
    });
    await t.commit();
  } catch (error) {
    logger.error("Error deleting user, repository");
    throw error;
  }
};

const searchForUser = async (query) => {
  try {
    logger.info("Searching for user, repository");
    const { query: q } = query;
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { first_name: { [Op.substring]: q } },
          { last_name: { [Op.substring]: q } },
          { email: { [Op.substring]: q } },
        ],
      },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "username",
        "email",
        "title",
      ],
      include: [
        {
          model: models.Customer,
          attributes: ["id", "name"],
          as: "customers",
        },
        {
          model: models.UserPhoneNumber,
          as: "user_phone_numbers",
          include: [
            {
              model: models.Extension,
              as: "extension",
            },
          ],
        },
        {
          model: models.Department,
          as: "department",
        },
        {
          model: models.User,
          as: "manager",
        },
      ],
    });
    return users;
  } catch (error) {
    logger.error("Error searching for user, repository");
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
            if (association === "roles") {
              await UserRole.create(
                {
                  user_id: userId,
                  role_id: associatedData,
                },
                { transaction: t }
              );
            } else {
              await Model.create(
                {
                  ...associatedData,
                  user_id: userId,
                },
                { transaction: t }
              );
            }
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

module.exports = {
  getUsers,
  getUserById,
  patchUser,
  deleteUser,
  createUser,
  getUsersByFilters,
  getUserByFilters,
  searchForUser,
};
