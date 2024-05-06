const singularize = require("pluralize").singular;

const changeInputToModelName = (input) => {
  const inputParts = input.split("_");

  const modelName = inputParts
    .map((part) => singularize(part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");

  return modelName;
};

module.exports = {
  changeInputToModelName,
};
