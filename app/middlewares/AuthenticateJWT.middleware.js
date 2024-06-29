const jwt = require("jsonwebtoken");
const logger = require("../utils/Logger");
const jwtSecret = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  logger.info("Authenticating JWT");

  const authHeader = req.header("Authorization");

  if (!authHeader) {
    logger.error("No auth header");
    return res.status(401).send("Access denied: No auth header");
  }

  try {
    const token = authHeader.split(" ")[1];

    if (!token) {
      logger.error("No token provided");
      return res.status(401).send("Access denied: No token provided");
    }

    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        logger.error("Invalid token");
        return res.status(403).send("Invalid token");
      }

      next();
    });
  } catch (error) {
    logger.error("Authentication failed");
    return res.status(401).send("Access denied");
  }
};

module.exports = authenticateJWT;
