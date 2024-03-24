const { v4: uuid } = require("uuid");
const dayjs = require("dayjs");
const { countBy, keyBy, filter } = require("lodash");
const Rentals = require("../../models/rentals");
const Cars = require("../../models/cars");
const { getExistingRentals } = require("../../utils/rentals");

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
      pricePerDay,
      phoneNumber,
      carId,
      userId,
    } = req.body;

    // Validate input
    if (!pickupDate || !pickupTime || !returnDate || !returnTime) {
      return res
        .status(400)
        .json({ message: "Invalid pickup or return date/time" });
    }

    const combineDateTime = (date, time) => new Date(`${date}T${time}:00.000Z`);

    // Combine date and time
    const formatPickupDateTime = combineDateTime(pickupDate, pickupTime);
    const formatReturnDateTime = combineDateTime(returnDate, returnTime);

    // Check if pickupDateTime and returnDateTime are valid
    if (isNaN(formatPickupDateTime) || isNaN(formatReturnDateTime)) {
      return res
        .status(400)
        .json({ message: "Invalid pickup or return date/time format" });
    }

    const totalDays = dayjs(returnDate).diff(dayjs(pickupDate), "days");
    const totalCost = totalDays * pricePerDay;

    const newReservation = new Rentals({
      id: uuid(),
      firstName,
      lastName,
      email,
      fromAddress,
      toAddress,
      pickupDateTime: formatPickupDateTime,
      returnDateTime: formatReturnDateTime,
      passengers,
      luggages,
      message,
      phoneNumber,
      totalDays,
      totalCost,
      userId,
      carId,
    });

    await newReservation.save();
    return res.status(200).json({ message: "reservation_added" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAvailableCars = async (req, res) => {
  try {
    const { pickupDateTime, returnDateTime } = req.body;
    const formatPickupDateTime = new Date(`${pickupDateTime}+00:00`);
    const formatReturnDateTime = new Date(`${returnDateTime}+00:00`);

    const cars = await Cars.find({});

    const existingReservations = await getExistingRentals({
      pickupDateTime: formatPickupDateTime,
      returnDateTime: formatReturnDateTime,
    });

    const carsObj = keyBy(cars, "id");

    const reservationCountObj = countBy(
      existingReservations.map((r) => r.carId)
    );

    const availableCars = filter(carsObj, (car, id) => {
      return (
        !reservationCountObj[id] || car.totalCount > reservationCountObj[id]
      );
    });

    if (availableCars.length > 0) {
      return res.status(200).json({ cars: availableCars });
    } else {
      return res.status(200).json({ cars: [] });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.isCarAvailable = async (req, res) => {
  try {
    const { carId, pickupDateTime, returnDateTime } = req.body;
    const formatPickupDateTime = new Date(`${pickupDateTime}+00:00`);
    const formatReturnDateTime = new Date(`${returnDateTime}+00:00`);

    const car = await Cars.findOne({ id: carId });
    const existingReservations = await getExistingRentals({
      carId,
      pickupDateTime: formatPickupDateTime,
      returnDateTime: formatReturnDateTime,
    });

    if (car.totalCount > existingReservations.length) {
      return res.status(200).json({ message: "Car available" });
    } else {
      return res.status(200).json({ message: "Car not available" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
