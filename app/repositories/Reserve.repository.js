const { Reserve, Customer } = require("../db/models");
const customerRepository = require("./Customer.repository");

const { GET_CUSTOMER_QUERY } = require("./queries");

const createReserve = async (body) => {
  console.log(body);
  const customer = await customerRepository.createCustomer(body);
  const id = customer.id;
  return await Reserve.create({ customer_id: id });
};

const getReserves = async () => {
  return await Reserve.findAll({
    include: [
      {
        model: Customer,
        as: "customer",
        ...GET_CUSTOMER_QUERY,
      },
    ],
  });
};

const getReserveById = async () => {
  return await Reserve.findByPk(id);
};

const deleteReserveByCustomerId = async (customerId) => {
  return await Reserve.destroy({
    where: {
      customer_id: customerId,
    },
  });
};

module.exports = {
  createReserve,
  getReserves,
  getReserveById,
  deleteReserveByCustomerId,
};
