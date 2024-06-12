const { Extension } = require("../db/models");

const createExtension = async (body) => {
  const extension = await Extension.create(body);
  return extension;
};

const getExtensions = async () => {
  return await Extension.findAll();
};

const getExtensionById = async (id) => {
  return await Extension.findByPk(id);
};

const patchExtension = async (id, body) => {
  const extension = await Extension.findByPk(id);

  await extension.update(body);
};

const deleteExtension = async (id) => {
  await Extension.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getExtensions,
  getExtensionById,
  patchExtension,
  deleteExtension,
  createExtension,
};
