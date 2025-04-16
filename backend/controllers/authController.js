const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// @desc POST register
// @route POST /api/auth/register
// @access public

const register = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ username });
  if (userExists){
    res.status(400);
    throw new Error("มีชื่อผู้ใช้นี้เเล้ว");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User({
    username,
    password: hashedPassword,
    role,
  });
  await newUser.save();

  res.status(201).json({
    message: `User created successfully with username ${username}`,
  });
});

// @desc POST login
// @route POST /api/auth/login
// @access public

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Username and password are required");
  }

  const user = await User.findOne({ username });
  if (!user) {
    res.status(404);
    throw new Error(`ไม่เจอชื่อผู้ใช้ ${username} `);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400);
    throw new Error("รหัสผ่านไม่ถูกต้อง");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );

  res.status(200).json({
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
    },
  });
});

module.exports = {
  register,
  login,
};
