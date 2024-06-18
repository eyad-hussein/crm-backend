"use strict";
const { Permissions } = require("../../enums/PermissionType.enum");
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
      "permissions",
      [
        {
          permission_name: Permissions.NONE,
          description: "No permission",
        },
        {
          permission_name: Permissions.VIEW_USER,
          description: "View user",
        },
        {
          permission_name: Permissions.CREATE_USER,
          description: "Create user",
        },
        {
          permission_name: Permissions.UPDATE_USER,
          description: "Update user",
        },
        {
          permission_name: Permissions.DELETE_USER,
          description: "Delete user",
        },
        {
          permission_name: Permissions.GRANT_VIEW_ACCESS,
          description: "Grant view access",
        },
        {
          permission_name: Permissions.RESET_PASSWORD,
          description: "Reset password",
        },
        {
          permission_name: Permissions.FREEZE_USER,
          description: "Freeze user",
        },
        {
          permission_name: Permissions.GRANT_CRUD_ACCESS,
          description: "Grant CRUD access",
        },
        {
          permission_name: Permissions.CREATE_CLIENT,
          description: "Create client",
        },
        {
          permission_name: Permissions.VIEW_CLIENT,
          description: "View client",
        },
        {
          permission_name: Permissions.UPDATE_CLIENT,
          description: "Update client",
        },
        {
          permission_name: Permissions.DELETE_CLIENT,
          description: "Delete client",
        },
        {
          permission_name: Permissions.GRANT_APPROVAL,
          description: "Grant approval",
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

    await queryInterface.bulkDelete("permissions", null, {});
  },
};
