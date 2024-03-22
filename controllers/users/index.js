const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const Users = require("../../models/users");
require("dotenv").config();

exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, password, email, role } = req.body;
    const isExistingUser = await Users.findOne({ email });
    if (isExistingUser) {
      return res.status(409).json({ message: "already_registered" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = Users({
        id: uuid(),
        firstName,
        lastName,
        password: hashedPassword,
        email,
        role,
      });
      await newUser.save();
      return res.status(200).json({ message: "resgistered_successfully" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: "error_occured" });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "inavlid_credentials" });
    }
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (isMatch) {
      const payload = {
        user: {
          id: user.id,
        },
      };
      const tempUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        email: user.email,
        address: user.address,
        role: user.role,
      };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 1000000,
      });
      return res.status(200).json({ token, user: tempUser });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: "error_occured" });
  }
};
