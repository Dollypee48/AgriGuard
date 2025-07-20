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

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/pests', pestRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.json({ status: 'FarmGuard backend is running ✅', version: '1.0.0' });
});

// ✅ Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ✅ Connect DB and start server
connectDB()
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
