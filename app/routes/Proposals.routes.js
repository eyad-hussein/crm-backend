const express = require("express");
const { proposalController } = require("../controllers");

const router = express.Router();

router.post("/", proposalController.createProposal);

router.get("/", proposalController.getProposals);
router.get("/:id", proposalController.getProposalById);

router.patch("/:id", proposalController.patchProposal);

router.delete("/:id", proposalController.deleteProposal);

module.exports = router;
