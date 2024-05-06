const customerController = require("./Customer.controller");
const onHoldController = require("./OnHold.controller");
const reserveController = require("./Reserve.controller");
const prospectController = require("./Prospect.controller");
const clientController = require("./Client.controller");
const proposalController = require("./Proposal.controller");

const userController = require("./User.controller");
const accountController = require("./Account.controller");

module.exports = {
  customerController,
  onHoldController,
  reserveController,
  prospectController,
  clientController,
  proposalController,

  userController,
  accountController,
};
