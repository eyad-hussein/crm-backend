"use strict";

const { LeadSourceType } = require("../../enums");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("customers", "lead_source", {
      type: Sequelize.ENUM,
      values: LeadSourceType.values,
      defaultValue: LeadSourceType.defaultValue,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("customers", "lead_source");
  },
};
