const { Prospect, Customer } = require("../db/models");
const customerRepository = require("./Customer.repository");

const { GET_CUSTOMER_QUERY } = require("./queries");
const createProspect = async (body) => {
  try {
    console.log("Creating prospect, repository");
    return await Prospect.create(body);
  } catch (error) {
    throw error;
  }
};

const getProspects = async () => {
  try {
    console.log("Getting prospects, repository");

    return await Prospect.findAll({
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

const getProspectById = async () => {
  try {
    console.log("Getting prospect by id, repository");
    return await Prospect.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteProspectByCustomerId = async (customerId) => {
  try {
    console.log("Deleting prospect by customer id, repository");

    return await Prospect.destroy({
      where: {
        customer_id: customerId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProspect,
  getProspects,
  getProspectById,
  deleteProspectByCustomerId,
};
