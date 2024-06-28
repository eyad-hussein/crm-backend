const logger = require("../utils/Logger");

const { CustomerStatusType } = require("../enums");
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
    logger.info("Getting customers, controller");
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
  try {
    logger.info("putting customer, controller");
    const { id } = req.params;
    const { body } = req;

    await customerRepository.putCustomer(id, body);
    res.json({
      message: "Customer and associated models updated successfully",
    });
  } catch (error) {
    logger.error("error putting customer, controller");
    throw error;
  }
});

const deleteCustomer = asyncHandler(async (req, res, next) => {
  try {
    logger.info("deleting customer, controller");
    const { id } = req.params;

    await customerRepository.deleteCustomer(id);
    res.json({
      message: "Customer and associated models deleted successfully",
    });
  } catch (error) {
    logger.error("error deleting customer, controller");
    throw error;
  }
});

const createCustomer = asyncHandler(async (req, res, next) => {
  try {
    logger.info("creating customer, controller");
    const { body } = req;
    const { status } = body;

    logger.info("body, and status", { body, status });

    const customer = await customerRepository.createCustomer(body);
    const { id } = customer;

    await _createRecordBasedOnStatus(status, id);

    res.json(id);
  } catch (error) {
    throw error;
  }
});

const patchCustomerStatus = asyncHandler(async (req, res, next) => {
  try {
    logger.info("patching customer status, controller");
    const { id, status } = req.params;
    _changeCustomerStatus(id, status);
    res.json("Status updated successfully");
  } catch (error) {
    throw error;
  }
});

const searchForCustomer = asyncHandler(async (req, res, next) => {
  try {
    logger.info("searching for customer, controller");
    res.json(await customerRepository.searchForCustomer(req.query));
  } catch (error) {
    throw error;
  }
});

const filterCustomers = asyncHandler(async (req, res, next) => {
  try {
    logger.info("filtering customers, controller");
    res.json(await customerRepository.filterCustomers(req.body));
  } catch (error) {
    throw error;
  }
});

const sortCustomers = asyncHandler(async (req, res, next) => {
  try {
    logger.info("sorting customers, controller");
    res.json(await customerRepository.sortCustomers(req.body));
  } catch (error) {
    throw error;
  }
});

const _createRecordBasedOnStatus = async (status, customerId) => {
  try {
    logger.info("creating record based on status, controller");
    const body = {
      customer_id: customerId,
    };

    switch (status) {
      case CustomerStatusType.FOLLOW_UP:
        await followUpRepository.createFollowUp(body);
        break;
      case CustomerStatusType.CLOSURE:
        await closureRepository.createClosure(body);
        break;
      case CustomerStatusType.PROSPECT:
        await prospectRepository.createProspect(body);
        break;
      case CustomerStatusType.CONTACT:
        await contactRepository.createContact(body);
        break;
      case CustomerStatusType.PROPSAL:
        await proposalRepository.createProposal(body);
        break;
      case CustomerStatusType.CUSTOMER:
      default:
        res.json("Nothing to do here");
    }
  } catch (error) {
    throw error;
  }
};

// I could make it that i get the status, change its name to a model name(function already written), then delete or update with the model, however, I believe this is a more better and genereal approach

const _deleteCustomerByStatus = async (status, customerId) => {
  try {
    logger.info("deleting customer by status, controller");

    switch (status) {
      case CustomerStatusType.FOLLOW_UP:
        await followUpRepository.deleteFollowUpByCustomerId(customerId);
        break;
      case CustomerStatusType.CLOSURE:
        await closureRepository.deleteClosureByCustomerId(customerId);
        break;
      case CustomerStatusType.PROSPECT:
        await prospectRepository.deleteProspectByCustomerId(customerId);
        break;
      case CustomerStatusType.CONTACT:
        await contactRepository.deleteContactByCustomerId(customerId);
        break;
      case CustomerStatusType.PROPOSAL:
        await proposalRepository.deleteProposalByCustomerId(customerId);
        break;
      case CustomerStatusType.CUSTOMER:
      default:
        return "Nothing to do here";
    }
  } catch (error) {
    throw error;
  }
};

const _updateCustomerByStatus = async (status, customerId) => {
  try {
    logger.info("updating customer by status, controller");
    const body = {
      customer_id: customerId,
    };

    logger.info("body and status", { body, status });

    switch (status) {
      case CustomerStatusType.FOLLOW_UP:
        await followUpRepository.createFollowUp(body);
        break;
      case CustomerStatusType.CLOSURE:
        await closureRepository.createClosure(body);
        break;
      case CustomerStatusType.PROSPECT:
        await prospectRepository.createProspect(body);
        break;
      case CustomerStatusType.CONTACT:
        await contactRepository.createContact(body);
        break;
      case CustomerStatusType.PROPOSAL:
        await proposalRepository.createProposal(body);
        break;
      case CustomerStatusType.CUSTOMER:
      default:
        return "Nothing to do here";
    }
  } catch (error) {
    throw error;
  }
};

const _changeCustomerStatus = async (customerId, newStatus) => {
  try {
    logger.info("changing customer status, controller");
    const customer = await customerRepository.getCustomerById(customerId);
    const { status } = customer;
    let oldStatus = status;

    await _deleteCustomerByStatus(oldStatus, customerId);
    await customerRepository.patchCustomer(customerId, { status: newStatus });
    await _updateCustomerByStatus(newStatus, customerId);
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
  patchCustomerStatus,
  searchForCustomer,
  filterCustomers,
  sortCustomers,
};
