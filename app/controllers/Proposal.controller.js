const { proposalRepository } = require("../repositories");

const asyncHandler = require("express-async-handler");

const getProposals = asyncHandler(async (req, res, next) => {
  res.json(await proposalRepository.getProposals());
});

const getProposalById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await proposalRepository.getProposalById(id));
});

const patchProposal = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await proposalRepository.patchProposal(id, body);
  res.json({ message: "Proposal and associated models updated successfully" });
});

const deleteProposal = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await proposalRepository.deleteProposal(id);
  res.json({ message: "Proposal and associated models deleted successfully" });
});

const createProposal = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const proposal = await proposalRepository.createProposal(body);
  const { id } = proposal;
  res.json(id);
});

module.exports = {
  getProposals,
  getProposalById,
  patchProposal,
  deleteProposal,
  createProposal,
};
