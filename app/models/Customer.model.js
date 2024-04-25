const db = require("../database/init");
const { DataTypes } = require("sequelize");
const { AccountModel, AddressModel } = require("./init");

const CustomerModel = db.define("customers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
  account_id: {
    type: DataTypes.INTEGER,
    references: {
      model: AccountModel,
      key: "id",
    },
  },
  address_id: {
    type: DataTypes.INTEGER,
    references: {
      model: AddressModel,
      key: "id",
    },
  },
});

module.exports = CustomerModel;
