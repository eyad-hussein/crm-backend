const db = require("../db/models");
const logger = require("../utils/Logger");

const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    const userParsed = JSON.parse(req.headers.user);
    const user = await db.User.findByPk(userParsed.id);

    const userRoles = await user.getRoles();
    const userRolesNames = userRoles.map((role) => role.role_name);
    const hasAllowedRole = userRolesNames.some((role) => roles.includes(role));

    if (!hasAllowedRole) {
      logger.info(roles);
      logger.info(userRolesNames);
      return res.status(403).json({
        message: "You are not authorized to access this route",
      });
    }
    next();
  };
};

module.exports = authorizeRoles;
