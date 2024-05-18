const { where } = require("sequelize");
const { Activity } = require("../db/models");

const createActivity = async (body) => {
  try {
    console.log("Creating activity, repository");
    console.log("body", body);
    return await Activity.create(body);
  } catch (error) {
    throw error;
  }
};

const getActivities = async (customerId) => {
  try {
    console.log("Getting activities, repository");

    return await Activity.findAll({
      where: {
        customer_id: customerId,
      },
    });
  } catch (error) {
    throw error;
  }
};

const getActivityById = async () => {
  try {
    console.log("Getting activity by id, repository");
    return await Activity.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteActivity = async (activityId) => {
  try {
    console.log("Deleting activity by customer id, repository");

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
    console.log("Patching activity, repository");

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
  deleteActivity,
  patchActivity,
};
