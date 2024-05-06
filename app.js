// TODO: Make imports absolute

require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const {
  customersRouter,
  usersRouter,
  accountsRouter,
} = require("./app/routes");

const db = require("./app/db/models/index");

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use("/customers", customersRouter);
app.use("/users", usersRouter);
app.use("/accounts", accountsRouter);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

module.exports = app;
