"use strict";

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

    await queryInterface.bulkInsert(
      "countries",
      [
        {
          id: 1,
          country_name: "Nigeria",
          country_code: "NG",
        },
        {
          id: 2,
          country_name: "Ghana",
          country_code: "GH",
        },
        {
          id: 3,
          country_name: "Kenya",
          country_code: "KE",
        },
        {
          id: 4,
          country_name: "South Africa",
          country_code: "ZA",
        },
        {
          id: 5,
          country_name: "United States",
          country_code: "US",
        },
        {
          id: 6,
          country_name: "United Kingdom",
          country_code: "UK",
        },
        {
          id: 7,
          country_name: "Canada",
          country_code: "CA",
        },
        {
          id: 8,
          country_name: "Australia",
          country_code: "AU",
        },
        {
          id: 9,
          country_name: "Germany",
          country_code: "DE",
        },
        {
          id: 10,
          country_name: "France",
          country_code: "FR",
        },
      ],
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

    await queryInterface.bulkDelete("countries", null, {});
  },
};
