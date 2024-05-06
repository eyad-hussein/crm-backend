const { User, UserPhoneNumber, Customer } = require("../db/models");
const models = require("../db/models");
const { changeInputToModelName } = require("../utils/Parser.utils");

const GET_USER_QUERY = {
  attributes: ["id", "first_name", "last_name", "user_name", "email", "title"],
  include: [
    {
      model: UserPhoneNumber,
      as: "user_phone_numbers",
    },
    {
      model: Customer,
      attributes: ["id", "first_name", "last_name"],
      as: "customers",
    },
  ],
};

const createUser = async (body) => {
  const user = await User.create(body);
  return user;
};

const getUsers = async () => {
  return await User.findAll(GET_USER_QUERY);
};

const getUserById = async (id) => {
  return await User.findByPk(id, GET_USER_QUERY);
};

const patchUser = async (id, body) => {
  const user = await User.findByPk(id);

  await user.update(body);

  const associations = User.associations;

  for (const association of Object.keys(associations)) {
    if (body[association]) {
      const modelName = changeInputToModelName(association);
      await models[modelName].update(body[association], {
        where: {
          id: body[association]["id"],
        },
      });
    }
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
};
