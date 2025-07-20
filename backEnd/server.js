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


connectDB()
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });


app.use(cors(corsOptions));
app.use(express.json());


app.use('/api/pests', pestRoutes);


app.get('/', (req, res) => {
  res.json({ status: 'healthy', version: '1.0.0' });
});


if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(buildPath));

 
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.get("/", (req, res) => {
  res.send("FarmGuard backend is running ✅");
});

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
