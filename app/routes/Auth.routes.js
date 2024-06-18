const express = require("express");
const { authController } = require("../controllers");
const { authenticateJWT, authorizeRoles } = require("../middlewares");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.post("/test", authorizeRoles("admin"), authController.test);

module.exports = router;
