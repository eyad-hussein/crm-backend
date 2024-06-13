const express = require("express");
const { taskController } = require("../controllers");

const router = express.Router();

router.post("/", taskController.createTask);

router.get("/", taskController.getTasks);

router.patch("/:id", taskController.patchTask);

router.delete("/:id", taskController.deleteTask);

module.exports = router;
