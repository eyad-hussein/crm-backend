const express = require("express");
const { noteController } = require("../controllers");

const router = express.Router();

router.post("/", noteController.createNote);

router.get("/", noteController.getNotes);

router.patch("/:id", noteController.patchNote);

router.delete("/:id", noteController.deleteNote);

module.exports = router;
