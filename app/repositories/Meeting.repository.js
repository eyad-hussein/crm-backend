const logger = require("../utils/Logger");

const { Meeting } = require("../db/models");

const createMeeting = async (body) => {
  try {
    logger.info("Creating meeting, repository");
    return await Meeting.create(body);
  } catch (error) {
    throw error;
  }
};

const getMeetings = async () => {
  try {
    logger.info("Getting meetings, repository");

    return await Meeting.findAll();
  } catch (error) {
    throw error;
  }
};

const patchMeeting = async (meetingId, body) => {
  try {
    logger.info("Patching meeting, repository");

    const t = await models.sequelize.transaction();

    const meeting = await Meeting.findByPk(meetingId, { transaction: t });
    await meeting.update(body, { transaction: t });
    await t.commit();
  } catch (error) {
    logger.error("Error patching meeting, repository");
    throw error;
  }
};

const putMeeting = async (meetingId, body) => {
  try {
    logger.info("Putting meeting, repository");

    const t = await models.sequelize.transaction();

    const meeting = await Meeting.destroy(meetingId, { transaction: t });
    await meeting.create(body, { transaction: t });
    await t.commit();
  } catch (error) {
    logger.error("Error putting meeting, repository");
    throw error;
  }
};

const deleteMeeting = async (meetingId) => {
  try {
    logger.info("Deleting meeting by customer id, repository");

    return await Meeting.destroy({
      where: {
        id: meetingId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createMeeting,
  getMeetings,
  patchMeeting,
  putMeeting,
  deleteMeeting,
};
