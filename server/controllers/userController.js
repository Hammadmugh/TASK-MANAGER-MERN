import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

import User from "../models/userModel.js";

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(200).json({ message: "Invalid email format" });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    const registered = await User.findOne({ email });
    if (registered) {
      return res.status(200).json({ message: `Email already exists` });
    }
    await newUser.save();
    res.status(200).json({ message: `User registered with email ${email}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `User already exists` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: `Invalid Credentials` });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ message: `Invalid Credentials` });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, message: "Logged in" });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong ⚠️` });
  }
};

export default { register, login };
