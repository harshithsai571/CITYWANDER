// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect Database
connectDB();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // for images

// ✅ API Routes
app.use("/api", require("./routes/auth"));
app.use("/api/cities", require("./routes/cities")); // cities
app.use("/api/places", require("./routes/places")); // places

// ✅ Frontend routes
app.get("/", (_, res) => res.sendFile(path.join(__dirname, "../frontend/index.html")));
app.get("/login", (_, res) => res.sendFile(path.join(__dirname, "../frontend/login.html")));
app.get("/signup", (_, res) => res.sendFile(path.join(__dirname, "../frontend/signup.html")));
app.get("/admin-dashboard", (_, res) => res.sendFile(path.join(__dirname, "../frontend/admin-dashboard.html")));
app.get("/add-city", (_, res) => res.sendFile(path.join(__dirname, "../frontend/add-city.html")));
app.get("/add-place", (_, res) => res.sendFile(path.join(__dirname, "../frontend/add-place.html")));
app.get("/cities", (_, res) => res.sendFile(path.join(__dirname, "../frontend/cities.html")));
app.get("/city", (_, res) => res.sendFile(path.join(__dirname, "../frontend/city.html")));
app.get("/place", (_, res) => res.sendFile(path.join(__dirname, "../frontend/place.html")));
app.get("/travel-guide", (_, res) =>
  res.sendFile(path.join(__dirname, "../frontend/travel-guide.html"))
);

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
