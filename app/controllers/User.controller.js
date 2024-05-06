const { userRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getUsers = asyncHandler(async (req, res, next) => {
  res.json(await userRepository.getUsers());
});

const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await userRepository.getUserById(id));
});

const patchUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await userRepository.patchUser(id, body);
  res.json({ message: "User and associated models updated successfully" });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await userRepository.deleteUser(id);
  res.json({ message: "User and associated models deleted successfully" });
});

const createUser = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const user = await userRepository.createUser(body);
  const { id } = user;
  res.json(id);
});

module.exports = {
  getUsers,
  getUserById,
  patchUser,
  deleteUser,
  createUser,
};
