const AuditLog = require("../models/AuditLog");

async function logAudit({ action, user, eventId }) {
  await AuditLog.create({
    timestamp: new Date(),
    action,
    userEmail: user.email,
    userRole: user.role,
    eventId: eventId || null,
  });
}

module.exports = logAudit;
