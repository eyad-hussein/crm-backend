const { DataTypes } = require("sequelize");
const db = require("../database/init");

const CountryModel = db.define("countries", {
  country_name: {
    type: DataTypes.STRING,
  },
});

module.exports = CountryModel;
