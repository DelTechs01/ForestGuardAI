// backend/routes/contact.js
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // Placeholder: Save to database or send email
    console.log('Contact form submission:', { name, email, message });
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message' });
  }
});

module.exports = router;