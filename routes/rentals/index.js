const express = require("express");
const router = express.Router();
const { bookRide } = require("../../controllers/rentals");

router.post("/bookRide", bookRide);

module.exports = router;
