const {
  User,
  Customer,
  UserPhoneNumber,
  Extension,
  Department,
} = require("../../db/models");

const GET_USER_QUERY = {
  attributes: [
    "id",
    "first_name",
    "last_name",
    "username",
    "email",
    "title",
    "gender",
  ],
  include: [
    {
      model: Customer,
      attributes: ["id", "name"],
      as: "customers",
    },
    {
      model: UserPhoneNumber,
      as: "user_phone_numbers",
      include: [
        {
          model: Extension,
          as: "extension",
        },
      ],
    },
    {
      model: Department,
      as: "department",
    },
    {
      model: User,
      as: "manager",
    },
  ],
};

module.exports = GET_USER_QUERY;
