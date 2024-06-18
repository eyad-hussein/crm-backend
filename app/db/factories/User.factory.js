const { faker } = require("@faker-js/faker");

const generateUser = () => ({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  username: faker.internet.userName(),
  title: faker.person.jobTitle(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  created_at: new Date(),
  updated_at: new Date(),
});

module.exports = {
  generateUser,
};
