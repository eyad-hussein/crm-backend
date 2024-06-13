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
  const { id } = req.params;

  await userRepository.deleteUser(id);
  res.json({ message: "User and associated models deleted successfully" });
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

module.exports = {
  getUsers,
  getUserById,
  patchUser,
  deleteUser,
  createUser,
};
