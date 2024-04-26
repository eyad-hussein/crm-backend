const db = require("../database/MySQL.database");
const { DataTypes } = require("sequelize");

const Customer = db.define("customers", {
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  user_name: {
    type: DataTypes.STRING,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  marketing_objective: {
    type: DataTypes.STRING,
  },
  package_selected: {
    type: DataTypes.STRING,
  },
  service: {
    type: DataTypes.STRING,
  },
  priority: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Customer;
