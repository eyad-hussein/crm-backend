const logger = require("../utils/Logger");
const authService = require("../services/Auth.service");

const register = async (req, res, next) => {
  logger.info("Registering user, controller");
  return await authService.registerUser(req, res);
};

const login = async (req, res, next) => {
  logger.info("logging user, controller");
  return await authService.loginUser(req, res);
};

const logout = async (req, res, next) => {
  logger.info("logging out user, controller");
  res.clearCookie("token");
  res.status(200).send("Logged out");
};

const test = async (req, res, next) => {
  logger.info("testing user, controller");
  console.log(req);
  res.status(200).send("You are authenticated");
};

module.exports = {
  register,
  login,
  logout,
  test,
};
