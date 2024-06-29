const { Sequelize } = require("sequelize");

const mysqldb = new Sequelize("crm", "root", "123", {
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: false,
});

module.exports = mysqldb;
