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
    const permissionsIds = Array.from(
      { length: Math.ceil((15 - 2) / 1) },
      (_, i) => i * 1 + 2
    );

    await queryInterface.bulkInsert(
      "role_permissions",
      permissionsIds.map((permissionId) => ({
        role_id: 1,
        permission_id: permissionId,
      }))
    );

    await queryInterface.bulkInsert("role_permissions", [
      {
        role_id: 2,
        permission_id: 10,
      },
      {
        role_id: 2,
        permission_id: 12,
      },
      {
        role_id: 2,
        permission_id: 13,
      },
      {
        role_id: 2,
        permission_id: 11,
      },
      {
        role_id: 2,
        permission_id: 14,
      },
    ]);

    await queryInterface.bulkInsert("role_permissions", [
      {
        role_id: 3,
        permission_id: 10,
      },
      {
        role_id: 3,
        permission_id: 12,
      },
      {
        role_id: 3,
        permission_id: 13,
      },
      {
        role_id: 3,
        permission_id: 11,
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

    await queryInterface.bulkDelete("role_permissions", null, {});
  },
};
