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
      "extensions",
      [
        {
          id: 1,
          extension: "+234",
          country_id: "1",
        },
        {
          id: 2,
          extension: "+233",
          country_id: "2",
        },
        {
          id: 3,
          extension: "+254",
          country_id: "3",
        },
        {
          id: 4,
          extension: "+27",
          country_id: "4",
        },
        {
          id: 5,
          extension: "+1",
          country_id: "5",
        },
        {
          id: 6,
          extension: "+44",
          country_id: "6",
        },
        {
          id: 7,
          extension: "+1",
          country_id: "7",
        },
        {
          id: 8,
          extension: "+61",
          country_id: "8",
        },
        {
          id: 9,
          extension: "+49",
          country_id: "9",
        },
        {
          id: 10,
          extension: "+33",
          country_id: "10",
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

    await queryInterface.bulkDelete("extensions", null, {});
  },
};
