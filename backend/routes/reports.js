const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ timestamp: -1 });
    res.json(reports);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, content, type } = req.body;
  try {
    const report = new Report({ title, content, type });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;