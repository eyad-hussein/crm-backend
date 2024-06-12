"use strict";

const { StatusType, LeadSourceType } = require("../../enums");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      priority: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT,
      },
      follow_up_date: {
        type: Sequelize.DATE,
      },
      website: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: StatusType.values,
        defaultValue: StatusType.defaultValue,
      },
      lead_source: {
        type: Sequelize.ENUM,
        values: LeadSourceType.values,
        defaultValue: LeadSourceType.defaultValue,
      },
      industry_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "industries",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onDelete: "CASCADE",
      },
      image_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "images",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("customers");
  },
};
