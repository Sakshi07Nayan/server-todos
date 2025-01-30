const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  logging: console.log, 
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
    sequelize.sync() 
      .then(() => console.log("Tables created or synced"))
      .catch((err) => console.error("Error syncing models:", err));
  })
  .catch((err) => console.error("Database connection error:", err));

module.exports = sequelize;
