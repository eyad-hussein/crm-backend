const { DataTypes } = require("sequelize");
const db = require("../database/MySQL.database");

const State = db.define("states", {
  state_name: {
    type: DataTypes.STRING,
  },
});

module.exports = State;
