// backend/server.js
const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contact'); // Ensure this path is correct

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes); // Line 28 (example)

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Forest Guard AI Backend');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});