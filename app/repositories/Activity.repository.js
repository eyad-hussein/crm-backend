const logger = require("../utils/Logger");
const db = require("../db/models");
const { Activity, User } = require("../db/models");
const { changeInputToModelName } = require("../utils/Parser.utils");

const createActivity = async (body) => {
  try {
    logger.info("Creating activity, repository");

    const t = await db.sequelize.transaction();
    logger.info("body", { body });

    const { activity_type, title, description, customer_id, user_id } = body;
    const activity = await Activity.create(
      {
        activity_type,
        title,
        description,
        customer_id,
        user_id,
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
    return await Activity.findByPk(activity.id, {
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });
  } catch (error) {
    logger.error("Error creating activity, repository");
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
    logger.info("Getting activities by id, repository");
    const activities = await Activity.findAll({
      where: {
        customer_id: customerId,
      },
      include: [
        {
          model: db.Note,
          as: "note",
        },
        {
          model: db.Meeting,
          as: "meeting",
        },
        {
          model: db.Task,
          as: "task",
        },
        {
          model: db.User,
          as: "user",
        },
      ],
    });

    const formattedActivities = _formatActivities(activities);
    return formattedActivities;
  } catch (error) {
    throw error;
  }
};

const getActivitiesByUserId = async (userId) => {
  try {
    logger.info("Getting activities by id, repository");
    const activities = await Activity.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: db.Note,
          as: "note",
        },
        {
          model: db.Meeting,
          as: "meeting",
        },
        {
          model: db.Task,
          as: "task",
        },
        {
          model: db.User,
          as: "user",
        },
      ],
    });

    const formattedActivities = _formatActivities(activities);
    return formattedActivities;
  } catch (error) {
    throw error;
  }
};

const deleteActivity = async (activityId) => {
  try {
    logger.info("Deleting activity by customer id, repository");
    const t = await db.sequelize.transaction();
    await Activity.destroy(
      {
        where: {
          id: activityId,
        },
      },
      { transaction: t }
    );
    t.commit();
    return "Activity and associated models deleted successfully";
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
      },
    });
  } catch (error) {
    throw error;
  }
};

const _formatActivities = (activities) => {
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
      user: activity.user,
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
  });
  return formattedActivities;
};

module.exports = {
  createActivity,
  getActivities,
  getActivityById,
  getActivitiesByCustomerId,
  getActivitiesByUserId,
  deleteActivity,
  patchActivity,
};
