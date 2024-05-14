const { CustomerStateType } = require("../enums");
const {
  customerRepository,
  followUpRepository,
  closureRepository,
  proposalRepository,
  prospectRepository,
  contactRepository,
} = require("../repositories");

const asyncHandler = require("express-async-handler");

const getCustomers = asyncHandler(async (req, res, next) => {
  try {
    console.log("Getting customers, controller");
    res.json(await customerRepository.getCustomers());
  } catch (error) {
    return error;
  }
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

const putCustomer = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await customerRepository.putCustomer(id, body);
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
  try {
    console.log("patching customer state, controller");
    const { id, state } = req.params;
    _changeCustomerState(id, state);
    res.json("State updated successfully");
  } catch (error) {
    throw error;
  }
});

const _createRecordBasedOnState = async (state, customerId) => {
  const body = {
    customer_id: customerId,
  };

  switch (state) {
    case CustomerStateType.FOLLOW_UP:
      await followUpRepository.createFollowUp(body);
      break;
    case CustomerStateType.CLOSURE:
      await closureRepository.createClosure(body);
      break;
    case CustomerStateType.PROSPECT:
      await prospectRepository.createProspect(body);
      break;
    case CustomerStateType.CONTACT:
      await contactRepository.createContact(body);
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
  try {
    console.log("deleting customer by state, controller");

    switch (state) {
      case CustomerStateType.FOLLOW_UP:
        await followUpRepository.deleteFollowUpByCustomerId(customerId);
        break;
      case CustomerStateType.CLOSURE:
        await closureRepository.deleteClosureByCustomerId(customerId);
        break;
      case CustomerStateType.PROSPECT:
        await prospectRepository.deleteProspectByCustomerId(customerId);
        break;
      case CustomerStateType.CONTACT:
        await contactRepository.deleteContactByCustomerId(customerId);
        break;
      case CustomerStateType.PROPSAL:
        await proposalRepository.deleteProposalByCustomerId(customerId);
        break;
      case CustomerStateType.CUSTOMER:
      default:
        res.json("Nothing to do here");
    }
  } catch (error) {
    throw error;
  }
};

const _updateCustomerByState = async (state, customerId) => {
  try {
    console.log("updating customer by state, controller");
    const body = {
      customer_id: customerId,
    };

    console.log(body, state);

    switch (state) {
      case CustomerStateType.FOLLOW_UP:
        await followUpRepository.createFollowUp(body);
        break;
      case CustomerStateType.CLOSURE:
        await closureRepository.createClosure(body);
        break;
      case CustomerStateType.PROSPECT:
        await prospectRepository.createProspect(body);
        break;
      case CustomerStateType.CONTACT:
        await contactRepository.createContact(body);
        break;
      case CustomerStateType.PROPSAL:
        await proposalRepository.createProposal(body);
        break;
      case CustomerStateType.CUSTOMER:
      default:
        res.json("Nothing to do here");
    }
  } catch (error) {
    throw error;
  }
};

const _changeCustomerState = async (customerId, newState) => {
  try {
    console.log("changing customer state, controller");
    const customer = await customerRepository.getCustomerById(customerId);
    const { state } = customer;
    let oldState = state;

    await _deleteCustomerByState(oldState, customerId);
    await customerRepository.patchCustomer(customerId, { state: newState });
    await _updateCustomerByState(newState, customerId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  patchCustomer,
  putCustomer,
  deleteCustomer,
  createCustomer,
  patchCustomerState,
};
