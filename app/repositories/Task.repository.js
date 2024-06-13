const logger = require("../utils/Logger");

const { Task } = require("../db/models");

const createTask = async (body) => {
  try {
    logger.info("Creating task, repository");
    return await Task.create(body);
  } catch (error) {
    throw error;
  }
};

const getTasks = async () => {
  try {
    logger.info("Getting tasks, repository");

    return await Task.findAll();
  } catch (error) {
    throw error;
  }
};

const patchTask = async (taskId, body) => {
  try {
    logger.info("Patching task, repository");

    const t = await models.sequelize.transaction();

    const task = await Task.findByPk(taskId, { transaction: t });
    await task.update(body, { transaction: t });
    await t.commit();
  } catch (error) {
    logger.error("Error patching task, repository");
    throw error;
  }
};

const putTask = async (taskId, body) => {
  try {
    logger.info("Putting task, repository");

    const t = await models.sequelize.transaction();

    const task = await Task.destroy(taskId, { transaction: t });
    await task.create(body, { transaction: t });
    await t.commit();
  } catch (error) {
    logger.error("Error putting task, repository");
    throw error;
  }
};

const deleteTask = async (taskId) => {
  try {
    logger.info("Deleting task by customer id, repository");

    return await Task.destroy({
      where: {
        id: taskId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTask,
  getTasks,
  patchTask,
  putTask,
  deleteTask,
};
