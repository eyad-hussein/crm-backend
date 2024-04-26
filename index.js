// TODO: Make imports absolute

require("dotenv").config();
const express = require("express");

const db = require("./app/database/init");

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });