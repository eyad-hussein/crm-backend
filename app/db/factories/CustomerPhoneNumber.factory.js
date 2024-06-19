const { faker } = require("@faker-js/faker");

const generateCustomerPhoneNumber = () => ({
  phone_number: faker.phone.number(),
  extension_id: faker.number.int({ min: 1, max: 10 }),
  customer_id: faker.number.int({ min: 1, max: 10 }),
  created_at: new Date(),
  updated_at: new Date(),
});

module.exports = {
  generateCustomerPhoneNumber,
};
