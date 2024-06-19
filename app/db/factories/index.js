const { generateCustomer } = require("./Customer.factory");
const { generateUser } = require("./User.factory");
const { generateCustomerService } = require("./CustomerService.factory");
const {
  generateCustomerPhoneNumber,
} = require("./CustomerPhoneNumber.factory");
const { generateUserPhoneNumber } = require("./UserPhoneNumber.factory");
const { generateAddress } = require("./Address.factory");
module.exports = {
  generateCustomer,
  generateUser,
  generateCustomerService,
  generateCustomerPhoneNumber,
  generateUserPhoneNumber,
  generateAddress,
};
