const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
  invoice_no: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  driver_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['SUCCESS', 'PENDING', 'FAILED'],
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  available_on_date: {
    type: Date,
    required: true
  },
  balance_transaction: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  payment_intent_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('transactions', invoiceSchema);
