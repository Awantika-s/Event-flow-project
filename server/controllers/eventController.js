
const { Event } = require("../models/Event");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

exports.createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  const userId = req.user.id;

  try {
    const event = await Event.create({ title, description, date, organizerId: userId });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to create event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(id);//(req.params.id);
    if (!event){
         return res.status(404).json({ error: "Event not found" });
    }
    await event.destroy();
    res.status(204).end();
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error('Error deleting event:',error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, date } = req.body;
    try {
      const event = await Event.findByPk(id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      event.title = title;
      event.description = description;
      event.date = date;
      await event.save();  // Save updated event
      res.json(event);     // Return the updated event
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ error: 'Failed to update event' });
    }
  };


  const db = require('../models'); // Sequelize or direct MySQL pool

async function calculateEngagementScore(eventId) {
  const [[{ registrations }]] = await db.query(
    `SELECT COUNT(*) AS registrations FROM registrations WHERE event_id = ?`, [eventId]
  );

  const [[{ attended }]] = await db.query(
    `SELECT COUNT(*) AS attended FROM registrations WHERE event_id = ? AND attended = true`, [eventId]
  );

  const [[{ ratingAvg }]] = await db.query(
    `SELECT AVG(rating) AS ratingAvg FROM feedback WHERE event_id = ?`, [eventId]
  );

  const [[{ avg_response_time }]] = await db.query(
    `SELECT avg_response_time FROM responses WHERE event_id = ?`, [eventId]
  );

  // Calculate score
  let score = 0;

  // Registrations: 0–2 points
  if (registrations >= 20) score += 2;
  else if (registrations >= 10) score += 1;

  // Attendance Rate: 0–2 points
  const attendanceRate = registrations > 0 ? attended / registrations : 0;
  if (attendanceRate >= 0.8) score += 2;
  else if (attendanceRate >= 0.5) score += 1;

  // Organizer Responsiveness: 0–1 point
  if (avg_response_time !== null) {
    score += avg_response_time <= 60 ? 1 : 0;
  }

  // Feedback: 0–1 point
  if (ratingAvg !== null && ratingAvg >= 4) score += 1;

  return score;
}
