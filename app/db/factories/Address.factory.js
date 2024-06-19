const { faker } = require("@faker-js/faker");

const generateAddress = () => ({
  address_line_1: faker.location.streetAddress(),
  address_line_2: faker.location.secondaryAddress(),
  postal_code: faker.location.zipCode(),
  customer_id: faker.number.int({ min: 1, max: 10 }),
  city_id: faker.number.int({ min: 1, max: 199 }),
  state_id: faker.number.int({ min: 1, max: 100 }),
  country_id: faker.number.int({ min: 1, max: 10 }),
  created_at: new Date(),
  updated_at: new Date(),
});

module.exports = {
  generateAddress,
};
