const logger = require("../utils/Logger");

const { Note } = require("../db/models");

const createNote = async (body) => {
  try {
    logger.info("Creating note, repository");
    return await Note.create(body);
  } catch (error) {
    throw error;
  }
};

const getNotes = async () => {
  try {
    logger.info("Getting notes, repository");

    return await Note.findAll();
  } catch (error) {
    throw error;
  }
};

const patchNote = async (noteId, body) => {
  try {
    logger.info("Patching note, repository");

    const t = await models.sequelize.transaction();

    const note = await Note.findByPk(noteId, { transaction: t });
    await note.update(body, { transaction: t });
    await t.commit();
  } catch (error) {
    logger.error("Error patching note, repository");
    throw error;
  }
};

const putNote = async (noteId, body) => {
  try {
    logger.info("Putting note, repository");

    const t = await models.sequelize.transaction();

    const note = await Note.destroy(noteId, { transaction: t });
    await note.create(body, { transaction: t });
    await t.commit();
  } catch (error) {
    logger.error("Error putting note, repository");
    throw error;
  }
};

const deleteNote = async (noteId) => {
  try {
    logger.info("Deleting note by customer id, repository");

    return await Note.destroy({
      where: {
        id: noteId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNote,
  getNotes,
  patchNote,
  putNote,
  deleteNote,
};
