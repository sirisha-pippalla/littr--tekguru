const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  pickup_address: {
    type: Object,
    required: true
  },
  pickup_datetime: {
    type: Date,
    required: true
  },
  items: {
    type: [Object],
    required: true
  },
  status: {
    type: String,
    enum: ['CREATED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    required: true,
    default: 'CREATED'
  },
  user_id: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  sub_total: {
    type: Number,
    required: true
  },
  driver_fee: {
    type: Number,
    required: true
  },
  littr_fee: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('orders', orderSchema);
