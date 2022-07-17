const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

//Register a new user
//POST /api/users
//Access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //Check all fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please all fields are required.");
  }
  //Check if user exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw Error("User already exists");
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

//Authenticate a user
//POST /api/users/login
//Access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Check user email
  const user = await User.findOne({ email });
  //Compare password & hashed password with bcrypt method
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials.");
  }
});

//GET user data
//GET /api/users/me
//Access private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//Generate JTW
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JTW_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
