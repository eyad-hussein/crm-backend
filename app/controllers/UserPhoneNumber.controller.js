const { userPhoneNumberRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getUserPhoneNumbers = asyncHandler(async (req, res, next) => {
  res.json(await userPhoneNumberRepository.getUserPhoneNumbers());
});

const getUserPhoneNumberById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await userPhoneNumberRepository.getUserPhoneNumberById(id));
});

const patchUserPhoneNumber = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await userPhoneNumberRepository.patchUserPhoneNumber(id, body);
  res.json({
    message: "UserPhoneNumber and associated models updated successfully",
  });
});

const deleteUserPhoneNumber = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await userPhoneNumberRepository.deleteUserPhoneNumber(id);
  res.json({
    message: "UserPhoneNumber and associated models deleted successfully",
  });
});

const createUserPhoneNumber = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const userPhoneNumber = await userPhoneNumberRepository.createUserPhoneNumber(
    body
  );
  const { id } = userPhoneNumber;
  res.json(id);
});

module.exports = {
  getUserPhoneNumbers,
  getUserPhoneNumberById,
  patchUserPhoneNumber,
  deleteUserPhoneNumber,
  createUserPhoneNumber,
};
