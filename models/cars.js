const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  passengerCapacity: {
    type: Number,
    default: 0,
  },
  luggageCapacity: {
    type: Number,
    default: 0,
  },
  totalCount: {
    type: Number,
    default: 1,
  },
});

module.exports = Cars = mongoose.model("cars", carSchema);
