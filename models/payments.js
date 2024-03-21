const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  rentalId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending",
  },
});

module.exports = Payments = mongoose.model("payments", paymentSchema);
