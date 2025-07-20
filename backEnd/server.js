require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const pestRoutes = require('./routes/pestRoutes');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const app = express();

// Connect to MongoDB once
connectDB()
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use('/api/pests', pestRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'healthy', version: '1.0.0' });
});

// Serve React frontend build in production (optional)
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(buildPath));

  // For any other routes, serve React index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
