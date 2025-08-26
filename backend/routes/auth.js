// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET_KEY = "citywander_secret_key";

// ✅ User Signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ msg: "All fields are required" });

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: email === "admin@citywander.com", // admin flag
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin || false },
      SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      token,
      username: user.username,
      isAdmin: user.isAdmin || false,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
