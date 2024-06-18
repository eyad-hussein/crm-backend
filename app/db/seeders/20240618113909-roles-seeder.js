"use strict";
const { Roles } = require("../../enums/RoleType.enum");
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
      "roles",
      [
        {
          role_name: Roles.ADMIN,
          description: "Admin role",
        },
        {
          role_name: Roles.SALES_MANAGER,
          description: "Sales Manager role",
        },
        {
          role_name: Roles.SALES_REPRESENTATIVE,
          description: "Sales Rep role",
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

    await queryInterface.bulkDelete("roles", null, {});
  },
};
