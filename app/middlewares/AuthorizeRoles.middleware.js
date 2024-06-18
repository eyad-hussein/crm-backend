const db = require("../db/models");

const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    const reqRoles = req.body.roles;

    if (!reqRoles) {
      return res.status(401).send("Access denied");
    }

    try {
      let roleIds = roles.map(
        async (role) => await db.Role.findOne({ where: { role_name: role } })
      );

      roleIds = await Promise.all(roleIds);
      roleIds = roleIds.map((roleId) => roleId.id);

      if (!roleIds.some((roleId) => reqRoles.includes(roleId))) {
        return res.status(403).send("Access denied");
      }

      next();
    } catch (error) {
      console.error("Error authorizing roles:", error);
      res.status(500).send("Internal Server Error");
    }
  };
};

module.exports = authorizeRoles;
