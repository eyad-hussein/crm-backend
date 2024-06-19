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
          id: 1,
          permission_name: Permissions.NONE,
          description: "No permission",
        },
        {
          id: 2,
          permission_name: Permissions.VIEW_USER,
          description: "View user",
        },
        {
          id: 3,
          permission_name: Permissions.CREATE_USER,
          description: "Create user",
        },
        {
          id: 4,
          permission_name: Permissions.UPDATE_USER,
          description: "Update user",
        },
        {
          id: 5,
          permission_name: Permissions.DELETE_USER,
          description: "Delete user",
        },
        {
          id: 6,
          permission_name: Permissions.GRANT_VIEW_ACCESS,
          description: "Grant view access",
        },
        {
          id: 7,
          permission_name: Permissions.RESET_PASSWORD,
          description: "Reset password",
        },
        {
          id: 8,
          permission_name: Permissions.FREEZE_USER,
          description: "Freeze user",
        },
        {
          id: 9,
          permission_name: Permissions.GRANT_CRUD_ACCESS,
          description: "Grant CRUD access",
        },
        {
          id: 10,
          permission_name: Permissions.CREATE_CLIENT,
          description: "Create client",
        },
        {
          id: 11,
          permission_name: Permissions.VIEW_CLIENT,
          description: "View client",
        },
        {
          id: 12,
          permission_name: Permissions.UPDATE_CLIENT,
          description: "Update client",
        },
        {
          id: 13,
          permission_name: Permissions.DELETE_CLIENT,
          description: "Delete client",
        },
        {
          id: 14,
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
