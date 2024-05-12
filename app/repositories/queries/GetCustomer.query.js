const {
  CustomerPhoneNumber,
  User,
  Account,
  Service,
  Country,
} = require("../../db/models");

const GET_CUSTOMER_QUERY = {
  include: [
    {
      model: CustomerPhoneNumber,
      as: "customer_phone_numbers",
    },
    {
      model: User,
      attributes: ["id", "first_name", "last_name", "title"],
      as: "user",
    },
    { model: Account, as: "account" },
    { model: Service, as: "services" },
    { model: Country, as: "country" },
  ],
};

module.exports = GET_CUSTOMER_QUERY;
