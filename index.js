const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const server = express();
require("dotenv").config();

server.use(cors());
server.use(express.json({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" DATABASE CONNECTED"))
  .catch((err) => {
    console.log("DATABASE CONNECTION ERROR");
    console.log(err);
  });
mongoose.set("strictQuery", true);

const PORT = process.env.PORT || 5000;

server.get("/", (req, res) => {
  return res.status(200).json({ message: "SERVER WORKING" });
});

// server.use("/api/admin");
server.use("/api/users", require("./routes/users"));
server.use("/api/cars", require("./routes/cars"));
server.use("/api/rentals", require("./routes/rentals"));

server.listen(PORT, () => {
  console.log("🚀 SERVER LISTENING ON", PORT);
});
