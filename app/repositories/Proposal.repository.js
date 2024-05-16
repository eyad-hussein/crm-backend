const { Proposal } = require("../db/models");

const createProposal = async (body) => {
  try {
    console.log("Creating proposal, repository");
    return await Proposal.create(body);
  } catch (error) {
    throw error;
  }
};

const getProposals = async () => {
  try {
    console.log("Getting proposals, repository");
    return await Proposal.findAll();
  } catch (error) {
    throw error;
  }
};

const getProposalById = async () => {
  try {
    console.log("Getting proposal by id, repository");

    return await Proposal.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const deleteProposalByCustomerId = async (customerId) => {
  try {
    console.log("Deleting proposal by customer id, repository");
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
