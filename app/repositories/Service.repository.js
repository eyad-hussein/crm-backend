const logger = require("../utils/Logger");
const db = require("../db/models");
const { Service } = require("../db/models");

const createService = async (body) => {
  try {
    logger.info("Creating service, repository");
    const t = await db.sequelize.transaction();
    const service = await Service.create(body, { transaction: t });
    t.commit();
    return service;
  } catch (error) {
    logger.error("Error creating service");
    throw error;
  }
};

const getServices = async () => {
  try {
    logger.info("Getting services, repository");

    return await Service.findAll();
  } catch (error) {
    throw error;
  }
};

const getServiceById = async (id) => {
  try {
    logger.info("Getting service by id, repository");
    return await Service.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteService = async (serviceId) => {
  try {
    logger.info("Deleting service by customer id, repository");

    return await Service.destroy({
      where: {
        id: serviceId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  deleteService,
};
