const express = require("express");
const router = express.Router();
const {
  getCars,
  getCarDetailsById,
  addCar,
} = require("../../controllers/cars");

router.get("/", getCars);

router.get("/:id", getCarDetailsById);

router.post("/addcar", addCar);

module.exports = router;
