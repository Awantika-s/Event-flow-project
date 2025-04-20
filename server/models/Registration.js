const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Registration = sequelize.define("Registration", {
  eventId: DataTypes.INTEGER,
  attendeeId: DataTypes.INTEGER,
  status: DataTypes.ENUM("registered", "cancelled"),
  attended: DataTypes.BOOLEAN,
});

module.exports = Registration;
