const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email_verified: {
    type: Boolean,
    // required: true,
  },
  phone_number_verified: {
    type: Boolean,
    // required: true,
  },
  phone_number: {
    type: String,
    // required: true,
  },
  first_name: {
    type: String,
    // required: true,
  },
  last_name: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"], // Assuming only two roles are allowed
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: String,
    // required: true,
    unique: true,
  },
  password: {
    type:String,
    unique:true
  }
});

module.exports = mongoose.model("users", UserSchema);
