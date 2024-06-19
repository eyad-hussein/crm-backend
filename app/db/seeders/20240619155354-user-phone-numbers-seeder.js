"use strict";
const { generateUserPhoneNumber } = require("../factories");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const userPhoneNumbers = Array.from({ length: 20 }).map(() =>
      generateUserPhoneNumber()
    );

    await queryInterface.bulkInsert("user_phone_numbers", userPhoneNumbers, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("user_phone_numbers", null, {});
  },
};
