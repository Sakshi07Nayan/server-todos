const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Todo = sequelize.define("Todo", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
});

Todo.belongsTo(User, { foreignKey: "user_id" });

module.exports = Todo;
