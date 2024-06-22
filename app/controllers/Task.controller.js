const { taskRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");
const logger = require("../utils/Logger");

const getTasks = asyncHandler(async (req, res, next) => {
  res.json(await taskRepository.getTasks());
});

const patchTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await taskRepository.patchTask(id, body);
  res.json({
    message: "Task and associated models updated successfully",
  });
});

const putTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await taskRepository.putTask(id, body);
  res.json({
    message: "Task and associated models updated successfully",
  });
});

const deleteTask = asyncHandler(async (req, res, next) => {
  try {
    logger.info("Deleting task, controller");
    const { id } = req.params;

    await taskRepository.deleteTask(id);
    res.json({
      message: "Task and associated models deleted successfully",
    });
  } catch (error) {
    logger.error("Error deleting task, controller");
    throw error;
  }
});

const createTask = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const task = await taskRepository.createTask(body);
  const { id } = task;
  res.json(id);
});

module.exports = {
  getTasks,
  patchTask,
  putTask,
  deleteTask,
  createTask,
};
