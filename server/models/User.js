const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  role: DataTypes.ENUM("attendee", "organizer"),
  password: DataTypes.STRING,
});

module.exports = User;
