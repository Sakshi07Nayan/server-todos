const sequelize = require("../config/db");
const User = require("./user");
const Todo = require("./todo");

sequelize.sync({ alter: true }) // Creates tables if they don't exist
    .then(() => console.log("Database synchronized"))
    .catch((err) => console.error("Error syncing database:", err));

module.exports = { User, Todo };
