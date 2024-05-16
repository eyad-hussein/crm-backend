const { Closure, Customer } = require("../db/models");

const { GET_CUSTOMER_QUERY } = require("./queries");

const createClosure = async (body) => {
  try {
    console.log("Creating closure, repository");

    return await Closure.create(body);
  } catch (error) {
    throw error;
  }
};

const getClosures = async () => {
  try {
    console.log("Getting closures, repository");
    return await Closure.findAll({
      include: [
        {
          model: Customer,
          as: "customer",
          ...GET_CUSTOMER_QUERY,
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

const getClosureById = async () => {
  try {
    console.log("Getting closure by id, repository");
    return await Closure.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteClosureByCustomerId = async (customerId) => {
  try {
    console.log("Deleting closure by customer id, repository");

    return await Closure.destroy({
      where: {
        customer_id: customerId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createClosure,
  getClosures,
  getClosureById,
  deleteClosureByCustomerId,
};
