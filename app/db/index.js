const logger = require("../utils/Logger");
const db = require("./MySQL.database");
// const {
//   Account,
//   Customer,
//   Lead,
//   Contact,
//   User,
//   UserPhoneNumber,
//   Activity,
//   Address,
//   City,
//   State,
//   Country,
//   PostalCode,
//   CustomerPhoneNumber,
// } = require("../models/init");

// Account.hasOne(Customer, {
//   foreignKey: "account_id",
// });
// Customer.belongsTo(Account, {
//   foreignKey: "account_id",
// });

// Customer.hasOne(Lead, {
//   foreignKey: "customer_id",
// });
// Lead.belongsTo(Customer, {
//   foreignKey: "customer_id",
// });

// Lead.hasOne(Contact, {
//   foreignKey: "lead_id",
// });
// Contact.belongsTo(Lead, {
//   foreignKey: "lead_id",
// });

// User.hasOne(Contact, {
//   foreignKey: "user_id",
// });
// Contact.belongsTo(User, {
//   foreignKey: "user_id",
// });

// User.hasMany(UserPhoneNumber, {
//   foreignKey: "user_id",
// });
// UserPhoneNumber.belongsTo(User, {
//   foreignKey: "user_id",
// });

// User.hasMany(User, {
//   foreignKey: "manager_id",
//   as: "subordinates",
// });
// User.belongsTo(User, {
//   foreignKey: "manager_id",
//   as: "manager",
// });

// Customer.hasMany(Activity, {
//   foreignKey: "customer_id",
// });
// Activity.belongsTo(Customer, {
//   foreignKey: "customer_id",
// });

// City.hasMany(Address, {
//   foreignKey: "city_id",
// });
// Address.belongsTo(City, {
//   foreignKey: "city_id",
// });

// State.hasMany(Address, {
//   foreignKey: "state_id",
// });
// Address.belongsTo(State, {
//   foreignKey: "state_id",
// });

// Country.hasMany(Address, {
//   foreignKey: "country_id",
// });
// Address.belongsTo(Country, {
//   foreignKey: "country_id",
// });

// PostalCode.hasMany(Address, {
//   foreignKey: "postal_code_id",
// });
// Address.belongsTo(PostalCode, {
//   foreignKey: "postal_code_id",
// });

// Customer.hasMany(Address, {
//   foreignKey: "customer_id",
// });
// Address.belongsTo(Customer, {
//   foreignKey: "customer_id",
// });

// Customer.hasMany(CustomerPhoneNumber, {
//   foreignKey: "customer_id",
// });
// CustomerPhoneNumber.belongsTo(Customer, {
//   foreignKey: "customer_id",
// });

module.exports = () =>
  db
    .authenticate()
    .then(() => {
      logger.info("Connection has been established successfully.");
    })
    .catch((error) => {
      logger.error("Unable to connect to the database: ", error);
    });
