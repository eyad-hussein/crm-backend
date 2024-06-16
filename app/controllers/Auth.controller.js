const logger = require("../utils/Logger");
const authService = require("../services/Auth.service");

const register = async (req, res, next) => {
  try {
    logger.info("Registering user, controller");

    res.status(201).json(await authService.registerUser(req.body));
  } catch (error) {
    logger.error("Error registering user, controller");
    res.status(500).send("Error registering user");
  }
};

module.exports = {
  register,
};
