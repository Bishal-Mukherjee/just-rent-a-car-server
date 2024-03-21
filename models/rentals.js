const mongoose = require("mongoose");

const rentalSchema = mongoose.Schema({
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
  userId: {
    type: String,
    required: true,
  },
  carId: {
    type: String,
    required: true,
  },
  fromAddress: {
    type: String,
    required: true,
  },
  toAddress: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  passengers: {
    type: Number,
    required: true,
  },
  luggages: {
    type: Number,
    required: true,
  },
  pickupDate: {
    type: String,
    required: true,
  },
  pickupTime: {
    type: String,
    required: true,
  },
  returnDate: {
    type: String,
    required: true,
  },
  returnTime: {
    type: String,
    required: true,
  },
  totalDays: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    // required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending",
  },
});

module.exports = Rentals = mongoose.model("rentals", rentalSchema);
