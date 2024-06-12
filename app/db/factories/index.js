const { generateIndustry } = require("./Industry.factory");
const { generateCustomer } = require("./Customer.factory");
const { generateService } = require("./Service.factory");
const { generateUser } = require("./User.factory");

module.exports = {
  generateCustomer,
  generateUser,
  generateService,
  generateIndustry,
};
