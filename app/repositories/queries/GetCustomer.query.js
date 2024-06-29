const {
  CustomerPhoneNumber,
  User,
  Industry,
  Package,
  Address,
} = require("../../db/models");

const GET_CUSTOMER_QUERY = {
  include: [
    { model: CustomerPhoneNumber, as: "customer_phone_numbers" },
    { model: User, as: "user" },
    { model: Industry, as: "industry" },
    { model: Package, as: "package" },
    { model: Address, as: "addresses", include: ["city", "state", "country"] },
  ],
};

module.exports = GET_CUSTOMER_QUERY;
