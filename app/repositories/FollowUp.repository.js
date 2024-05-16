const { FollowUp } = require("../db/models");

const createFollowUp = async (body) => {
  try {
    console.log("Creating follow up, repository");
    return await FollowUp.create(body);
  } catch (error) {
    throw error;
  }
};

const getFollowUps = async () => {
  try {
    console.log("Getting follow ups, repository");
    return await FollowUp.findAll();
  } catch (error) {
    throw error;
  }
};

const getFollowUpById = async () => {
  try {
    console.log("Getting follow up by id, repository");
    return await FollowUp.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteFollowUpByCustomerId = async (customerId) => {
  try {
    console.log("Deleting follow up by customer id, repository");
    return await FollowUp.destroy({
      where: {
        customer_id: customerId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createFollowUp,
  getFollowUps,
  getFollowUpById,
  deleteFollowUpByCustomerId,
};
