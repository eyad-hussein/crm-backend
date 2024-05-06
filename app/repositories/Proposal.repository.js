const { Proposal } = require("../db/models");

const createProposal = async (body) => {
  return await Proposal.create(body);
};

const getProposals = async () => {
  return await Proposal.findAll();
};

const getProposalById = async () => {
  return await Proposal.findByPk(id);
};

const deleteProposalByCustomerId = async (customerId) => {
  return await Proposal.destroy({
    where: {
      customer_id: customerId,
    },
  });
};

module.exports = {
  createProposal,
  getProposals,
  getProposalById,
  deleteProposalByCustomerId,
};
