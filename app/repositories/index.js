const customerRepository = require("./Customer.repository");
const followUpRepository = require("./FollowUp.repository");
const closureRepository = require("./Closure.repository");
const prospectRepository = require("./Prospect.repository");
const contactRepository = require("./Contact.repository");
const proposalRepository = require("./Proposal.repository");
const userRepository = require("./User.repository");
const accountRepository = require("./Account.repository");
const countryRepository = require("./Country.repository");
const customerPhoneNumberRepository = require("./CustomerPhoneNumber.repository");

module.exports = {
  customerRepository,
  followUpRepository,
  closureRepository,
  prospectRepository,
  contactRepository,
  proposalRepository,
  userRepository,
  accountRepository,
  countryRepository,
  customerPhoneNumberRepository,
};
