"use strict";
const { PhoneNumberType } = require("../../enums/index");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_phone_numbers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      extension: {
        type: Sequelize.STRING,
      },
      type_of_number: {
        type: Sequelize.ENUM,
        values: PhoneNumberType.values,
        defaultValue: PhoneNumberType.defaultValue,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
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
    await queryInterface.dropTable("user_phone_numbers");
  },
};
