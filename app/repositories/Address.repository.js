const { Address } = require("../db/models");

const createAddress = async (body) => {
  const address = await Address.create(body);
  return address;
};

const getAddresses = async () => {
  return await Address.findAll();
};

const getAddressesByFilters = async (filterOptions) => {
  return await Address.findAll({
    where: filterOptions,
  });
};

const getAddressById = async (id) => {
  return await Address.findByPk(id);
};

const patchAddress = async (id, body) => {
  const address = await Address.findByPk(id);

  await address.update(body);
};

const deleteAddress = async (id) => {
  await Address.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getAddresses,
  getAddressById,
  patchAddress,
  deleteAddress,
  createAddress,
  getAddressesByFilters,
};
