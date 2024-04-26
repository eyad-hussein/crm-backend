const db = require("../database/MySQL.database");
const { DataTypes } = require("sequelize");

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const PhoneNumber = db.define("phone_numbers", {
  phone: {
    type: DataTypes.STRING,
  },
});
const Test = db.define("test_user", {
  name: {
    type: DataTypes.STRING,
  },
});

Test.hasMany(PhoneNumber);
PhoneNumber.belongsTo(Test, {
  foreignKey: "test_user_id",
});

db.sync()
  .then(() => {
    console.log("test created");
  })
  .catch((e) => console.log(e));
