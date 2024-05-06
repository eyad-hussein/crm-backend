const { faker } = require("@faker-js/faker");

const generateService = () => ({
  service_name: faker.person.jobTitle(),
  service_cost: faker.commerce.price(),
  created_at: new Date(),
  updated_at: new Date(),
});

module.exports = {
  generateService,
};
