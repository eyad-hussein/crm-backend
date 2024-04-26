const Account = require("./Account.model");
const Activity = require("./Activity.model");
const Address = require("./Address.model");
const City = require("./City.model");
const Contact = require("./Contact.model");
const Country = require("./Country.model");
const Customer = require("./Customer.model");
const CustomerPhoneNumber = require("./CustomerPhoneNumber.model");
const Lead = require("./Lead.model");
const PostalCode = require("./PostalCode.model");
const State = require("./State.model");
const User = require("./User.model");
const UserPhoneNumber = require("./UserPhoneNumber.model");

module.exports = {
  Customer,
  Lead,
  User,
  Contact,
  CustomerPhoneNumber,
  UserPhoneNumber,
  Activity,
  Country,
  State,
  PostalCode,
  City,
  Account,
  Address,
};
