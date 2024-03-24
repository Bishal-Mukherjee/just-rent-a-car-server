const Rentals = require("../models/rentals");

// returns existing reservations (carId is optional) within the given time range
exports.getExistingRentals = async ({
  carId,
  pickupDateTime,
  returnDateTime,
}) => {
  try {
    const existingReservations = await Rentals.find({
      ...(carId
        ? {
            carId,
          }
        : null),
      $or: [
        {
          pickupDateTime: { $lte: pickupDateTime },
          returnDateTime: { $gte: returnDateTime },
        },
        {
          pickupDateTime: {
            $gte: pickupDateTime,
            $lte: returnDateTime,
          },
        },
      ],
    }).select("-_id carId");

    return existingReservations;
  } catch (err) {
    console.log(err.message);
  }
};
