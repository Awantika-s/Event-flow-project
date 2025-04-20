const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const authMiddleware = require("../middlewares/authMiddleware");
const logAudit = require("../utils/logAudit");

// Register for an event
router.post("/:eventId", authMiddleware, async (req, res) => {
  try {
    const registration = await Registration.create({
      eventId: req.params.eventId,
      attendeeId: req.user.id,
      status: "registered",
      attended: false,
    });

    await logAudit({
      action: "Event Registered",
      user: req.user,
      eventId: req.params.eventId,
    });

    res.json(registration);
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Failed to register for event" });
  }
});

// Unregister from an event
router.delete("/:eventId", authMiddleware, async (req, res) => {
  try {
    await Registration.destroy({
      where: { eventId: req.params.eventId, attendeeId: req.user.id },
    });

    await logAudit({
      action: "Event Unregistered",
      user: req.user,
      eventId: req.params.eventId,
    });

    res.json({ message: "Unregistered" });
  } catch (err) {
    console.error("Unregistration error:", err);
    res.status(500).json({ error: "Failed to unregister from event" });
  }
});

module.exports = router;

