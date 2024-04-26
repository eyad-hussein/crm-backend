const { DataTypes } = require("sequelize");
const db = require("../database/MySQL.database");

const Country = db.define("countries", {
  country_name: {
    type: DataTypes.STRING,
  },
});

module.exports = Country;
