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
      "departments",
      [
        {
          id: 1,
          department_name: "Sales",
          description: "Sales department",
        },
        {
          id: 2,
          department_name: "Marketing",
          description: "Marketing department",
        },
        {
          id: 3,
          department_name: "Finance",
          description: "Finance department",
        },
        {
          id: 4,
          department_name: "Human Resources",
          description: "Human Resources department",
        },
        {
          id: 5,
          department_name: "Operations",
          description: "Operations department",
        },
        {
          id: 6,
          department_name: "IT",
          description: "IT department",
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

    await queryInterface.bulkDelete("departments", null, {});
  },
};
