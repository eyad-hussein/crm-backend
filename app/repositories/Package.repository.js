const logger = require("../utils/Logger");
const db = require("../db/models");
const { Package } = require("../db/models");

const createPackage = async (body) => {
  try {
    logger.info("Creating package, repository");
    const t = await db.sequelize.transaction();
    const package = await Package.create(body, { transaction: t });
    t.commit();
    return package;
  } catch (error) {
    logger.error("Error creating package");
    throw error;
  }
};

const getPackages = async () => {
  try {
    logger.info("Getting packages, repository");

    return await Package.findAll();
  } catch (error) {
    throw error;
  }
};

const getPackageById = async (id) => {
  try {
    logger.info("Getting package by id, repository");
    return await Package.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deletePackage = async (packageId) => {
  try {
    logger.info("Deleting package by customer id, repository");

    return await Package.destroy({
      where: {
        id: packageId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPackage,
  getPackages,
  getPackageById,
  deletePackage,
};
