const bcrypt = require("bcrypt");
const logger = require("../utils/Logger");
const userRepository = require("../repositories/User.repository");

const _hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        reject("Error hashing password");
      } else {
        resolve(hashedPassword);
      }
    });
  });
};

const registerUser = async (body) => {
  try {
    logger.info("Registering user, service");

    const { password } = body;
    const hashedPassword = await _hashPassword(password);

    body.password = hashedPassword;

    console.log(hashedPassword);

    return await userRepository.createUser(body);
  } catch (error) {
    logger.error("Error registering user, service");
    throw error;
  }
};

module.exports = {
  registerUser,
};
