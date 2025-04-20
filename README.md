# Event-flow-project
Event Flow Project
 EventFlow - Event Management Platform

EventFlow is a full-stack event management platform with real-time registration, role-based dashboards, engagement scoring, and a clean UI.

Features
- Organizer and Attendee roles
- Event creation, registration, and feedback
- Engagement scoring algorithm
- Real-time notifications using Socket.IO
- Responsive React UI with Tailwind CSS
- Audit logging and RESTful APIs
- Deployed frontend and backend

- Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express, MySQL
-  WebSocket: Socket.IO




Organizer Dashboard
- Create, update, and delete events
- View engagement scores per event
- Real-time updates when attendees register

# Attendee Dashboard
- View all available events
- Register/unregister for events
- Get real-time confirmation of registration status

# Engagement Score (0–6 points)
- Registration count (0–2)
- Attendance confirmation rate (0–2)
- Organizer responsiveness (0–1)
- Attendee feedback (0–1)


# Authentication & Authorization
- Role-based login for `attendee` and `organizer`
- JWT token handling and protected routes

# Audit Logging
- Middleware for logging all key API interactions

---

# Tech Stack

**Frontend**
- React.js (with Hooks)
- React Router
- Tailwind CSS
- Axios

**Backend**
- Node.js + Express.js
- MySQL with Sequelize ORM
- Socket.IO for real-time notifications
- JWT-based authentication



