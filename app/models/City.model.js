const { DataTypes } = require("sequelize");
const db = require("../database/MySQL.database");

const City = db.define("cities", {
  city_name: {
    type: DataTypes.STRING,
  },
});

module.exports = City;
