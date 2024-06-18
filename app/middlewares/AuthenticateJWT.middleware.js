const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  if (!req.header("Authorization")) {
    return res.status(401).send("Access denied");
  }
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied");
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
