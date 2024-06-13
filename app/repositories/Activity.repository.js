const logger = require("../utils/Logger");
const db = require("../db/models");
const { Activity } = require("../db/models");
const { changeInputToModelName } = require("../utils/Parser.utils");

const createActivity = async (body) => {
  try {
    logger.info("Creating activity, repository");

    const t = await db.sequelize.transaction();
    logger.info("body", { body });

    const { activity_type, title, description, customer_id } = body;
    const activity = await Activity.create(
      {
        activity_type,
        title,
        description,
        customer_id,
      },
      { transaction: t }
    );

    if (body[activity_type]) {
      const model = changeInputToModelName(activity_type);
      const modelBody = body[activity_type];
      modelBody.activity_id = activity.id;
      await db[model].create(modelBody, { transaction: t });
    }
    t.commit();
    return activity;
  } catch (error) {
    throw error;
  }
};

const getActivities = async () => {
  try {
    logger.info("Getting activities, repository");

    return await Activity.findAll({});
  } catch (error) {
    throw error;
  }
};

const getActivityById = async (id) => {
  try {
    logger.info("Getting activity by id, repository");

    return await Activity.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const getActivitiesByCustomerId = async (customerId) => {
  try {
    logger.info("Getting activity by id, repository");
    const activities = await Activity.findAll({
      where: {
        customer_id: customerId,
      },
      include: [
        {
          model: db.Note,
          as: "note",
          include: [
            {
              model: db.User,
              as: "user",
              attributes: ["first_name", "last_name"],
            },
          ],
        },
        {
          model: db.Task,
          as: "task",
          include: [
            {
              model: db.User,
              as: "user",
              attributes: ["first_name", "last_name"],
            },
          ],
        },
        {
          model: db.Meeting,
          as: "meeting",
          include: [
            {
              model: db.User,
              as: "user",
              attributes: ["first_name", "last_name"],
            },
          ],
        },
      ],
    });

    const formattedActivities = {
      meetings: [],
      notes: [],
      tasks: [],
    };

    activities.forEach((activity) => {
      const formattedActivity = {
        id: activity.id,
        activity_type: activity.activity_type,
        title: activity.title,
        description: activity.description,
        created_at: activity.created_at,
        customer_id: activity.customer_id,
        [activity.activity_type]: activity[activity.activity_type],
      };

      switch (activity.activity_type) {
        case "meeting":
          formattedActivities.meetings.push(formattedActivity);
          break;
        case "note":
          formattedActivities.notes.push(formattedActivity);
          break;
        case "task":
          formattedActivities.tasks.push(formattedActivity);
          break;
      }

      return formattedActivities;
    });

    return formattedActivities;
  } catch (error) {
    throw error;
  }
};

const deleteActivity = async (activityId) => {
  try {
    logger.info("Deleting activity by customer id, repository");

    return await Activity.destroy({
      where: {
        id: activityId,
      },
    });
  } catch (error) {
    throw error;
  }
};

const patchActivity = async (body) => {
  try {
    logger.info("Patching activity, repository");

    return await Activity.update(body, {
      where: {
        id: body.id,
        customer_id: body.customer_id,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createActivity,
  getActivities,
  getActivityById,
  getActivitiesByCustomerId,
  deleteActivity,
  patchActivity,
};
