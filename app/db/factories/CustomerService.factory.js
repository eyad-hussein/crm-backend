const { faker } = require("@faker-js/faker");

const generateCustomerService = () => ({
  customer_id: faker.number.int({ min: 1, max: 10 }),
  service_id: faker.number.int({ min: 1, max: 9 }),
  created_at: new Date(),
  updated_at: new Date(),
});

module.exports = {
  generateCustomerService,
};
