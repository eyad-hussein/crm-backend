const logger = require("../utils/Logger");

const { Proposal, Customer } = require("../db/models");

const { GET_CUSTOMER_QUERY } = require("./queries");

const createProposal = async (body) => {
  try {
    logger.info("Creating proposal, repository");
    return await Proposal.create(body);
  } catch (error) {
    throw error;
  }
};

const getProposals = async () => {
  try {
    logger.info("Getting proposals, repository");

    return await Proposal.findAll({
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

const getProposalById = async () => {
  try {
    logger.info("Getting proposal by id, repository");

    return await Proposal.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteProposalByCustomerId = async (customerId) => {
  try {
    logger.info("Deleting proposal by customer id, repository");
    return await Proposal.destroy({
      where: {
        customer_id: customerId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProposal,
  getProposals,
  getProposalById,
  deleteProposalByCustomerId,
};
