const { noteRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res, next) => {
  res.json(await noteRepository.getNotes());
});

const patchNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await noteRepository.patchNote(id, body);
  res.json({
    message: "Note and associated models updated successfully",
  });
});

const putNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await noteRepository.putNote(id, body);
  res.json({
    message: "Note and associated models updated successfully",
  });
});

const deleteNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await noteRepository.deleteNote(id);
  res.json({
    message: "Note and associated models deleted successfully",
  });
});

const createNote = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const note = await noteRepository.createNote(body);
  const { id } = note;
  res.json(id);
});

module.exports = {
  getNotes,
  patchNote,
  putNote,
  deleteNote,
  createNote,
};
