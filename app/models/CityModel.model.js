const { DataTypes } = require("sequelize");
const db = require("../database/init");

const CityModel = db.define("cities", {
  city_name: {
    type: DataTypes.STRING,
  },
});

module.exports = CityModel;
