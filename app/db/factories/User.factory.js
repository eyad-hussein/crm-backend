const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

const _hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        reject("Error hashing password");
      } else {
        resolve(hashedPassword);
      }
    });
  });
};

const generateUser = async () => ({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  username: faker.internet.userName(),
  title: faker.person.jobTitle(),
  email: faker.internet.email(),
  password: await _hashPassword(faker.internet.password()),
  gender: faker.helpers.arrayElement(["male", "female"]),
  department_id: faker.number.int({ min: 1, max: 6 }),
  created_at: new Date(),
  updated_at: new Date(),
});

module.exports = {
  generateUser,
};
