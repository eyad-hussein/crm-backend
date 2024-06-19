"use strict";
const { generateCustomerPhoneNumber } = require("../factories");
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

    const customerPhoneNumbers = Array.from({ length: 20 }).map(() =>
      generateCustomerPhoneNumber()
    );

    await queryInterface.bulkInsert(
      "customer_phone_numbers",
      customerPhoneNumbers,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("customer_phone_numbers", null, {});
  },
};
