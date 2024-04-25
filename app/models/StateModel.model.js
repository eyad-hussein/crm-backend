const { DataTypes } = require("sequelize");
const db = require("../database/init");

const StateModel = db.define("states", {
  state_name: {
    type: DataTypes.STRING,
  },
});

module.exports = StateModel;
