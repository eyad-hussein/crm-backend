const {
  CustomerPhoneNumber,
  User,
  Industry,
  Service,
  Activity,
  Address,
} = require("../../db/models");

const GET_CUSTOMER_QUERY = {
  include: [
    { model: CustomerPhoneNumber, as: "customer_phone_numbers" },
    { model: User, as: "user" },
    { model: Industry, as: "industry" },
    { model: Service, as: "services" },
    // { model: Activity, as: "activities" },
    { model: Address, as: "addresses", include: ["city", "state", "country"] },
  ],
};

module.exports = GET_CUSTOMER_QUERY;
