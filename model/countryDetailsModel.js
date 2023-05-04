const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  address_line1: {
    type: String,
    required: true
  },
  address_line2: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip_code: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    required: true,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('countrydetails', addressSchema);
