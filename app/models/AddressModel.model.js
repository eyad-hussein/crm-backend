const { DataTypes } = require("sequelize");
const db = require("../database/init");
const { AddressType } = require("../enums/init");
const {
  CityModel,
  StateModel,
  CountryModel,
  PostalCodeModel,
} = require("./init");

const AddressModel = db.define("addresses", {
  address_type: {
    type: DataTypes.ENUM,
    values: AddressType,
  },
  city_id: {
    type: DataTypes.INTEGER,
    references: {
      model: CityModel,
      key: "id",
    },
  },
  state_id: {
    type: DataTypes.INTEGER,
    references: {
      model: StateModel,
      key: "id",
    },
  },
  country_id: {
    type: DataTypes.INTEGER,
    references: {
      model: CountryModel,
      key: "id",
    },
  },
  postal_code_id: {
    type: DataTypes.INTEGER,
    references: {
      model: PostalCodeModel,
      key: "id",
    },
  },
});

module.exports = AddressModel;
