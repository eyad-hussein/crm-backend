const { faker } = require("@faker-js/faker");

const generateUserPhoneNumber = () => ({
  phone_number: faker.phone.number(),
  extension_id: faker.number.int({ min: 1, max: 10 }),
  user_id: faker.number.int({ min: 1, max: 10 }),
  created_at: new Date(),
  updated_at: new Date(),
});

module.exports = {
  generateUserPhoneNumber,
};
