const { v4: uuid } = require("uuid");
const Cars = require("../../models/cars");

exports.getCars = async (req, res) => {
  try {
    const cars = await Cars.find({});
    return res.status(200).json({ cars });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: "error_occured" });
  }
};

exports.getCarDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Cars.findOne({ id });
    return res.status(200).json(car);
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: "error_occured" });
  }
};

exports.addCar = async (req, res) => {
  try {
    const { model, pricePerDay, imageUrl, luggageCapacity, passengerCapacity } =
      req.body;
    const newCar = Cars({
      id: uuid(),
      model,
      pricePerDay,
      imageUrl,
      luggageCapacity,
      passengerCapacity,
    });
    await newCar.save();
    return res
      .status(200)
      .json({ message: "car_resgistered_successfully", car: newCar });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: "error_occured" });
  }
};
