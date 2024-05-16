const {
  CustomerPhoneNumber,
  User,
  Account,
  Service,
  Country,
  PostalCode,
} = require("../../db/models");

const GET_CUSTOMER_QUERY = {
  include: [
    {
      model: CustomerPhoneNumber,
      as: "customer_phone_number",
    },
    {
      model: User,
      attributes: ["id", "first_name", "last_name", "title"],
      as: "user",
    },
    { model: Account, as: "account" },
    { model: Service, as: "services" },
    { model: Country, as: "country" },
    { model: PostalCode, as: "postal_code" },
  ],
};

module.exports = GET_CUSTOMER_QUERY;
