const { DataTypes } = require("sequelize");

const db = require("../database/init");

const UserModel = db.define("users", {
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
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
  },
  manager_id: {
    type: DataTypes.INTEGER,
  },
});

module.exports = UserModel;
