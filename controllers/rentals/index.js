const { v4: uuid } = require("uuid");
const Rentals = require("../../models/rentals");

exports.bookRide = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      fromAddress,
      toAddress,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      message,
      passengers,
      luggages,
      phoneNumber,
      carId,
      userId,
    } = req.body;

    const newReservation = Rentals({
      id: uuid(),
      firstName,
      lastName,
      email,
      fromAddress,
      toAddress,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      passengers: parseInt(passengers),
      luggages: parseInt(luggages),
      message,
      phoneNumber,
      userId,
      carId,
      //   totalDays,
      //   totalCost, car.pricePerDay * totalDays calculated
    });
    await newReservation.save();
    return res.status(200).json({ message: "reservation_added" });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: "error_occured" });
  }
};
