const {
  Customer,
  CustomerPhoneNumber,
  User,
  Account,
  Service,
} = require("../db/models");

const asyncHandler = require("express-async-handler");

const getCustomers = asyncHandler(async (req, res, next) => {
  const customers = await Customer.findAll({
    attributes: ["id", "first_name", "last_name", "email"],
    include: [
      {
        model: CustomerPhoneNumber,
      },
      {
        model: User,
        attributes: ["first_name"],
      },
      { model: Account },
      { model: Service },
    ],
  });

  res.json(customers);
});

module.exports = {
  getCustomers,
};
