const jwt = require("jsonwebtoken");
const logger = require("../utils/Logger");
const jwtSecret = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  logger.info("Authenticating JWT");
  console.log(req.headers);

  const authHeader = req.header("Authorization");

  console.log("Auth Header:", authHeader);

  if (!authHeader) {
    return res.status(401).send("Access denied");
  }

  try {
    const token = authHeader.split(" ")[1];

    console.log("Token:", token);
    if (!token) {
      return res.status(401).send("Access denied");
    }

    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
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
