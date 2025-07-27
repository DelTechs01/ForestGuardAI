const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { type, severity, location, message } = req.body;
  try {
    const alert = new Alert({ type, severity, location, message });
    await alert.save();
    req.io.emit('alertUpdate', alert);
    res.status(201).json(alert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;