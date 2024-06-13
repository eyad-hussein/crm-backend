const logger = require("../utils/Logger");
const { activityRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getActivities = asyncHandler(async (req, res, next) => {
  res.json(await activityRepository.getActivities());
});

const getActivityById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await activityRepository.getActivityById(id));
});

const getActivitiesByCustomerId = asyncHandler(async (req, res, next) => {
  const { customerId } = req.params;
  res.json(await activityRepository.getActivitiesByCustomerId(customerId));
});

const patchActivity = asyncHandler(async (req, res, next) => {
  const { customerId, id } = req.params;
  const { body } = req;

  body.customer_id = customerId;
  body.id = id;

  await activityRepository.patchActivity(body);
  res.json({
    message: "Activity and associated models updated successfully",
  });
});

const deleteActivity = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await activityRepository.deleteActivity(id);
  res.json({
    message: "Activity and associated models deleted successfully",
  });
});

const createActivity = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const { customerId } = req.params;
  body.customer_id = customerId;
  logger.info("creating activity, controller", { customerId });

  const activity = await activityRepository.createActivity(body);

  res.json(activity);
});

module.exports = {
  getActivities,
  getActivityById,
  getActivitiesByCustomerId,
  patchActivity,
  deleteActivity,
  createActivity,
};
