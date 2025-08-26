const express = require("express");
const multer = require("multer");
const path = require("path");
const Place = require("../models/Place");
const { verifyAdmin } = require("../middleware/auth");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ POST - Add new place
router.post("/add", verifyAdmin, upload.array("images"), async (req, res) => {
  try {
    const { cityId, name, category, location, description, ticketPrice, timing, rating } = req.body;
    if (!cityId || !name || !category || !location || !description || !ticketPrice || !timing || !rating) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const images = req.files.map(file => `/uploads/${file.filename}`);

    const place = new Place({
      cityId,
      name,
      category,
      location,
      description,
      ticketPrice,
      timing,
      rating,
      images
    });

    await place.save();
    res.status(201).json({ msg: "Place added successfully." });
  } catch (err) {
    console.error("Add Place Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ GET place by ID (specific route first)
router.get("/details/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ msg: "Place not found" });
    res.json(place);
  } catch (err) {
    console.error("Fetch place error:", err);
    res.status(500).json({ msg: "Failed to load place" });
  }
});

// ✅ GET all places for a city (general route later)
router.get("/:cityId", async (req, res) => {
  try {
    const places = await Place.find({ cityId: req.params.cityId });
    res.json(places);
  } catch (err) {
    console.error("Fetch places error:", err);
    res.status(500).json({ msg: "Failed to load places" });
  }
});

module.exports = router;

