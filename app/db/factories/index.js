const { generateAccount } = require("./Account.factory");
const { generateCustomer } = require("./Customer.factory");
const { generateService } = require("./Service.factory");
const { generateUser } = require("./User.factory");

module.exports = {
  generateCustomer,
  generateUser,
  generateService,
  generateAccount,
};
