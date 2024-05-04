"use strict";
const { IndustryType } = require("../../enums/index");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("accounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      account_name: {
        type: Sequelize.STRING,
      },
      industry: {
        type: Sequelize.ENUM,
        values: IndustryType.values,
        defaultValue: IndustryType.defaultValue,
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
    await queryInterface.dropTable("accounts");
  },
};
