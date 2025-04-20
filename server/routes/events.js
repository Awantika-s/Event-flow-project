const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middlewares/authMiddleware");
const AuditLog = require("../models/AuditLog");
const Registration = require("../models/Registration");
const logAudit = require("../utils/logAudit");
const eventController = require("../controllers/eventController");
const { deleteEvent, updateEvent } = require('../controllers/eventController');

const{ calculateEngagementScore } = require('../controllers/eventController');

router.get("/", async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
});


router.post("/", authMiddleware, async (req, res) => {
  const { title, description, date } = req.body;
  const event = await Event.create({ title, description, date, organizerId: req.user.id });

  await logAudit({
    action: "Event Created",
    user: req.user,
    eventId: event.id,
  });

  res.json(event);
});

// DELETE /api/events/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.organizerId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this event" });
    }

    await event.destroy();

    await logAudit({
      action: "Event Deleted",
      user: req.user,
      eventId: event.id,
    });

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong while deleting" });
  }
});

router.get('/:id/score', async (req, res) => {
  const { id } = req.params;
  try {
    const score = await calculateEngagementScore(id);
    res.json({ eventId: id, engagementScore: score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to calculate engagement score' });
  }
});


router.get("/engagement/:eventId", async (req, res) => {
  const eventId = req.params.eventId;

  const registrations = await Registration.findAll({ where: { eventId } });
  const total = registrations.length;
  const attended = registrations.filter(r => r.attended).length;

  const feedbackScore = Math.round(Math.random()); // 0 or 1
  const responsiveness = Math.round(Math.random()); // 0 or 1

  const score = Math.min(2, total) + // registrations
                Math.min(2, Math.floor((attended / (total || 1)) * 2)) +
                responsiveness +
                feedbackScore;

  res.json({ score, breakdown: { total, attended, feedbackScore, responsiveness } });
});



module.exports = router;




