
const mongoose = require('mongoose');

const pestSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true,
  },
  scientificName: {
    type: String,
  },
  commonName: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], 
      required: true,
    },
  },
  reportedBy: {
    type: String, 
  },
  reportedAt: {
    type: Date,
    default: Date.now,
  },
});

pestSchema.index({ location: '2dsphere' }); 

module.exports = mongoose.model('Pest', pestSchema);
