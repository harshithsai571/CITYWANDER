const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true
  },
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["temple", "park", "hotel", "attraction"],
    required: true
  },
  location: { type: String, required: true },
  description: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  timing: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  images: [String]
}, { timestamps: true });

module.exports = mongoose.model("Place", placeSchema);

