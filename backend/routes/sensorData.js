const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 }).limit(100);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { temperature, humidity, co2, location } = req.body;
  try {
    const sensorData = new SensorData({ temperature, humidity, co2, location });
    await sensorData.save();
    req.io.emit('sensorUpdate', sensorData);
    res.status(201).json(sensorData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;