const { Customer, UserPhoneNumber, Extension } = require("../../db/models");
const GET_USER_QUERY = {
  attributes: ["id", "first_name", "last_name", "user_name", "email", "title"],
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
  ],
};

module.exports = GET_USER_QUERY;
