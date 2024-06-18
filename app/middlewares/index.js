const morganMiddleware = require("./Morgan.middleware");
const authorizeRoles = require("./AuthorizeRoles.middleware");
const authenticateJWT = require("./AuthenticateJWT.middleware");
module.exports = {
  morganMiddleware,
  authorizeRoles,
  authenticateJWT,
};
