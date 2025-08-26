// backend/routes/cities.js
const express = require("express");
const City = require("../models/City");
const { verifyAdmin } = require("../middleware/auth");

const router = express.Router();

// GET all cities
router.get("/", async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    console.error("Failed to fetch cities:", err);
    res.status(500).json({ msg: "Failed to load cities" });
  }
});

// POST add city (admin only)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { name, state, description, image } = req.body;

    if (!name || !state || !description || !image) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const city = new City({ name, state, description, images: [image] });
    await city.save();

    res.status(201).json({ msg: "City added successfully" });
  } catch (err) {
    console.error("Add city error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) return res.status(404).json({ msg: "City not found" });
    res.json(city);
  } catch (err) {
    console.error("Get city by ID error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});
// GET 2 random cities
router.get("/random/shortlist", async (req, res) => {
  try {
    const cities = await City.aggregate([{ $sample: { size: 2 } }]);
    res.json(cities);
  } catch (err) {
    console.error("Random cities error:", err);
    res.status(500).json({ msg: "Failed to load cities" });
  }
});
// GET single city by ID
router.get("/:id", async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) return res.status(404).json({ msg: "City not found" });
    res.json(city);
  } catch (err) {
    console.error("Fetch city error:", err);
    res.status(500).json({ msg: "Failed to fetch city" });
  }
});
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.post("/add", verifyAdmin, upload.single("image"), async (req, res) => {
  const { name, state, description } = req.body;
  const imagePath = `/uploads/${req.file.filename}`;
  const city = new City({ name, state, description, images: [imagePath] });
  await city.save();
  res.status(201).json({ msg: "City added successfully" });
});

module.exports = router;
