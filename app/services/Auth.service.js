const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const logger = require("../utils/Logger");
const userRepository = require("../repositories/User.repository");
const db = require("../db/models");

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

const registerUser = async (req, res) => {
  try {
    logger.info("Registering user, service");

    const { body } = req;

    const { password } = body;

    let hashedPassword;

    try {
      hashedPassword = await _hashPassword(password);
    } catch (error) {
      return res.status(500).send("Error registering user");
    }

    body.password = hashedPassword;

    await userRepository.createUser(body);

    return res.status(201).send("User registered");
  } catch (error) {
    return res.status(500).send("Error registering user");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    let user;

    try {
      user = await userRepository.getUserByFilters(
        {
          username: username,
          email: email,
        },
        {
          attributes: [
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
          ],
          include: {
            model: db.Role,
            as: "roles",
            through: "user_roles",
            attributes: ["role_name"],
          },
        }
      );
    } catch (error) {
      logger.error("Error getting user, service");
      return res.status(500).send("Internal server error");
    }

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send("Error comparing passwords");
      }

      if (!isMatch) {
        return res.status(401).send("Invalid credentials");
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        jwtSecret,
        { expiresIn: "7d" }
      );

      logger.info(token);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });

      res.cookie(
        "user",
        {
          id: user.id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          roles: user.roles.map((role) => role.role_name),
        },
        {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        }
      );

      return res.status(200).json({
        message: "User logged in",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          roles: user.roles.map((role) => role.role_name),
        },
      });
    });
  } catch (error) {
    logger.error("Error logging in, service");
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
