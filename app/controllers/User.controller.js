const { userRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");
const logger = require("../utils/Logger");

const getUsers = asyncHandler(async (req, res, next) => {
  res.json(await userRepository.getUsers());
});

const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await userRepository.getUserById(id));
});

const createUser = asyncHandler(async (req, res, next) => {
  try {
    logger.info("Creating user, controller");
    const { body } = req;
    const user = await userRepository.createUser(body);
    const { id } = user;
    res.json(id);
  } catch (error) {
    logger.error("Error creating user, controller");
    throw error;
  }
});

const patchUser = asyncHandler(async (req, res, next) => {
  try {
    logger.info("Patching user, controller");
    const { id } = req.params;
    const { body } = req;

    await userRepository.patchUser(id, body);
    res.json({ message: "User and associated models updated successfully" });
  } catch (error) {
    logger.error("Error patching user, controller");
    throw error;
  }
});

const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    logger.info("Deleting user, controller");
    const { id } = req.params;
    await userRepository.deleteUser(id);
    res.json({ message: "User and associated models deleted successfully" });
  } catch (error) {
    logger.error("Error deleting user, controller");
    throw error;
  }
});

const searchForUser = asyncHandler(async (req, res, next) => {
  try {
    logger.info("Searching for user, controller");
    const users = await userRepository.searchForUser(req.query);
    res.json(users);
  } catch (error) {
    logger.error("Error searching for user, controller");
    throw error;
  }
});

module.exports = {
  getUsers,
  getUserById,
  patchUser,
  deleteUser,
  createUser,
  searchForUser,
};
