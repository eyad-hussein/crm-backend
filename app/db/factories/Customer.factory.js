const { faker } = require("@faker-js/faker");

const generateCustomer = () => ({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  username: faker.internet.userName(),
  title: faker.person.jobTitle(),
  email: faker.internet.email(),
  marketing_objective: faker.word.noun(),
  package_selected: faker.word.noun(),
  priority: faker.number.int(1, 3),
  follow_up_date: faker.date.anytime(),
  user_id: 1,
  account_id: 2,
  created_at: new Date(),
  updated_at: new Date(),
});

module.exports = {
  generateCustomer,
};
