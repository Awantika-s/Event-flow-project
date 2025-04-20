const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AuditLog = sequelize.define("AuditLog", {
  timestamp: DataTypes.DATE,
  action: DataTypes.STRING,
  userEmail: DataTypes.STRING,
  userRole: DataTypes.STRING,
  eventId: DataTypes.INTEGER,
});

module.exports = AuditLog;