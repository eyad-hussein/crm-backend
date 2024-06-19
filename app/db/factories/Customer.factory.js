const { faker } = require("@faker-js/faker");

const generateCustomer = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  priority: faker.number.int({ min: 1, max: 3 }),
  description: faker.lorem.paragraph(),
  follow_up_date: faker.date.soon(),
  website: faker.internet.url(),
  status: faker.helpers.arrayElement([
    "prospect",
    "contact",
    "follow_up",
    "proposal",
    "closure",
  ]),
  lead_source: faker.helpers.arrayElement([
    "None",
    "Web",
    "Phone Inquiry",
    "Partner Referral",
    "Purchased List",
    "Other",
  ]),
  industry_id: faker.number.int({ min: 1, max: 16 }),
  user_id: faker.number.int({ min: 1, max: 10 }),
  // image_id: faker.number.int({ min: 1, max: 10 }), // Adjust range as needed or set to null if not used
  created_at: new Date(),
  updated_at: new Date(),
});

module.exports = {
  generateCustomer,
};
