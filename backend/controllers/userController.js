const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const zxcvbn = require("zxcvbn");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

//@desc Register a user
//@route POST /register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, age, password,batch } = req.body;
  const enrollMonth = new Date();
  if (!name || !phone || !age || !batch || !enrollMonth) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const numString = phone.toString();
  if (numString.length !== 10) {
    res.status(400);
    throw new Error("Phone number must be 10 digits");
  }
  const passwordStrength = zxcvbn(password);
  if (passwordStrength.score < 2) {
    res.status(400);
    throw new Error("Password is too weak. Please choose a stronger password");
  }
  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters");
  }
  if (age < 18 || age > 65) {
    res.status(400);
    throw new Error("Age must be between 18 and 65");
  }
  const userId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  let user = new User(
    userId,
    name,
    age,
    phone,
    batch,
    enrollMonth,
    hashedPassword
  );

  // Check if user exists
  const userLen = await user.checkUser();
  if (userLen.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }
  user = await user.save();

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  } else {
    res.status(201).json({
      _id: userId,
      phone,
    });
  }
});

//@desc Login a user
//@route POST /login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  console.log(req.body);
  if (!phone || !password) {
    res.status(400);
    throw new Error("Please enter phone number and password");
  }
  const user = new User(null, null, null, phone, null, null, null, null);
  const existingUser = await user.checkUser();
  if (
    existingUser &&
    (await bcrypt.compare(password, existingUser[0].password))
  ) {
    const accessToken = jwt.sign(
      {
        user: {
          id: existingUser[0].UserId,
          phone: existingUser[0].PhoneNumber,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION_TIME || "1h",
      }
    );
    // console.log(accessToken);
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid phone number or password");
  }
});

module.exports = {
  registerUser,
  loginUser,
};
