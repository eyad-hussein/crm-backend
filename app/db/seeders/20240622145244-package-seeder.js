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
    await queryInterface.bulkInsert("packages", [
      {
        package_name: "Alpha Nano",
        package_cost: 150,
        description: "This package is for beginners",
      },
      {
        package_name: "Alpha Pro",
        package_cost: 210,
        description: "This package is for pros",
      },
      {
        package_name: "Alpha Plus",
        package_cost: 350,
        description: "This package is for plusers",
      },
      {
        package_name: "Alpha Ultra",
        package_cost: 0,
        description: "This package is for ultra users",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("packages", null, {});
  },
};
