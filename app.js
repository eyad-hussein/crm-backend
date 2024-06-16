// TODO: Make imports absolute

require("dotenv").config();
const express = require("express");
const { morganMiddleware } = require("./app/middlewares");
const logger = require("./app/utils/Logger");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morganMiddleware);
const {
  customersRouter,
  usersRouter,
  industriesRouter,
  countriesRouter,
  customerPhoneNumbersRouter,
  citiesRouter,
  statesRouter,
  activitiesRouter,
  extensionsRouter,
  tasksRouter,
  meetingsRouter,
  notesRouter,
  userPhoneNumbersRouter,
  authRouter,
} = require("./app/routes");

const db = require("./app/db/models/index");

(async () => {
  try {
    await db.sequelize.authenticate();
    logger.info("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use("/customers", customersRouter);
app.use("/users", usersRouter);
app.use("/industries", industriesRouter);
app.use("/countries", countriesRouter);
app.use("/customer-phone-numbers", customerPhoneNumbersRouter);
app.use("/cities", citiesRouter);
app.use("/states", statesRouter);
app.use("/activities", activitiesRouter);
app.use("/extensions", extensionsRouter);
app.use("/tasks", tasksRouter);
app.use("/meetings", meetingsRouter);
app.use("/notes", notesRouter);
app.use("/user-phone-numbers", userPhoneNumbersRouter);
app.use("/auth", authRouter);

app.listen(5000, () => {
  logger.info("Server started on port 5000");
});

module.exports = app;
