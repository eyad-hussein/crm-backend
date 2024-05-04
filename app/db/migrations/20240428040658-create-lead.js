"use strict";

const { LeadStatusType, LeadSourceType } = require("../../enums/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("leads", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lead_status: {
        type: Sequelize.ENUM,
        values: LeadStatusType.values,
        defaultValue: LeadStatusType.defaultValue,
      },
      lead_source: {
        type: Sequelize.ENUM,
        values: LeadSourceType.values,
        defaultValue: LeadSourceType.defaultValue,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("leads");
  },
};
