const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "customer", "driver"],
    default: "customer",
  },
});

module.exports = Users = mongoose.model("users", userSchema);
