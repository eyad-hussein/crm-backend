const { faker } = require("@faker-js/faker");

const generateAccount = () => ({
  account_name: faker.person.jobTitle(),
  industry: "tech",
  created_at: new Date(),
  updated_at: new Date(),
});

module.exports = {
  generateAccount,
};
