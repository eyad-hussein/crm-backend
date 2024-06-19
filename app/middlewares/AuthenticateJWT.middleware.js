const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  console.log(req);
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).send("Access denied");
  }

  const token = authHeader.split(" ")[1];

  console.log("Token:", token);
  if (!token) {
    return res.status(401).send("Access denied");
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }

    res.status(200).send("Token is valid");
    next();
  });
};

module.exports = authenticateJWT;
