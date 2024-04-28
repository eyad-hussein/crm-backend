const { DataTypes } = require("sequelize");
const db = require("../db/MySQL.database");

const State = db.define("states", {
  state_name: {
    type: DataTypes.STRING,
  },
});

module.exports = State;
