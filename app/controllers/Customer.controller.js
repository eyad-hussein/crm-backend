const { CustomerStateType } = require("../enums");
const {
  customerRepository,
  onHoldRepository,
  reserveRepository,
  proposalRepository,
  prospectRepository,
  clientRepository,
} = require("../repositories");

const asyncHandler = require("express-async-handler");

const getCustomers = asyncHandler(async (req, res, next) => {
  res.json(await customerRepository.getCustomers());
});

const getCustomerById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res.json(await customerRepository.getCustomerById(id));
});

const patchCustomer = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await customerRepository.patchCustomer(id, body);
  res.json({ message: "Customer and associated models updated successfully" });
});

const deleteCustomer = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await customerRepository.deleteCustomer(id);
  res.json({ message: "Customer and associated models deleted successfully" });
});

const createCustomer = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const { state } = body;

  const customer = await customerRepository.createCustomer(body);
  const { id } = customer;

  await _createRecordBasedOnState(state, id);

  res.json(id);
});

const patchCustomerState = asyncHandler(async (req, res, next) => {
  const { id, state } = req.params;
  _changeCustomerState(id, state);
  res.json("State updated successfully");
});

const _createRecordBasedOnState = async (state, customerId) => {
  const body = {
    customer_id: customerId,
  };

  switch (state) {
    case CustomerStateType.ON_HOLD:
      await onHoldRepository.createOnHold(body);
      break;
    case CustomerStateType.RESERVE:
      await reserveRepository.createReserve(body);
      break;
    case CustomerStateType.PROSPECT:
      await prospectRepository.createProspect(body);
      break;
    case CustomerStateType.CLIENT:
      await clientRepository.createClient(body);
      break;
    case CustomerStateType.PROPSAL:
      await proposalRepository.createProposal(body);
      break;
    case CustomerStateType.CUSTOMER:
    default:
      res.json("Nothing to do here");
  }
};

// I could make it that i get the state, change its name to a model name(function already written), then delete or update with the model, however, I believe this is a more better and genereal approach

const _deleteCustomerByState = async (state, customerId) => {
  switch (state) {
    case CustomerStateType.ON_HOLD:
      await onHoldRepository.deleteOnHoldByCustomerId(customerId);
      break;
    case CustomerStateType.RESERVE:
      await reserveRepository.deleteReserveByCustomerId(customerId);
      break;
    case CustomerStateType.PROSPECT:
      await prospectRepository.deleteProspectByCustomerId(customerId);
      break;
    case CustomerStateType.CLIENT:
      await clientRepository.deleteClientByCustomerId(customerId);
      break;
    case CustomerStateType.PROPSAL:
      await proposalRepository.deleteProposalByCustomerId(customerId);
      break;
    case CustomerStateType.CUSTOMER:
    default:
      res.json("Nothing to do here");
  }
};

const _updateCustomerByState = async (state, customerId) => {
  const body = {
    customer_id: customerId,
  };
  switch (state) {
    case CustomerStateType.ON_HOLD:
      await onHoldRepository.createOnHold(body);
      break;
    case CustomerStateType.RESERVE:
      await reserveRepository.createReserve(body);
      break;
    case CustomerStateType.PROSPECT:
      await prospectRepository.createProspect(body);
      break;
    case CustomerStateType.CLIENT:
      await clientRepository.createClient(body);
      break;
    case CustomerStateType.PROPSAL:
      await proposalRepository.createProposal(body);
      break;
    case CustomerStateType.CUSTOMER:
    default:
      res.json("Nothing to do here");
  }
};

const _changeCustomerState = async (customerId, newState) => {
  const customer = await customerRepository.getCustomerById(customerId);
  const { state } = customer;
  let oldState = state;

  await _deleteCustomerByState(oldState, customerId);
  await customerRepository.patchCustomer(customerId, { state: newState });
  await _updateCustomerByState(newState, customerId);
};

module.exports = {
  getCustomers,
  getCustomerById,
  patchCustomer,
  deleteCustomer,
  createCustomer,
  patchCustomerState,
};
