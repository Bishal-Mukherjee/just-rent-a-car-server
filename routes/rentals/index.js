const express = require("express");
const rentalsRouter = express.Router();
const {
  bookRide,
  getAvailableCars,
  isCarAvailable,
} = require("../../controllers/rentals");

rentalsRouter.route("/bookRide").post(bookRide);
rentalsRouter.route("/getAvailableCars").post(getAvailableCars);
rentalsRouter.route("/isCarAvailable").post(isCarAvailable);

module.exports = rentalsRouter;
