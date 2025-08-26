const jwt = require("jsonwebtoken");
const SECRET_KEY = "citywander_secret_key";

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
}

function isAdmin(req, res, next) {
  if (!req.user?.isAdmin) return res.status(403).json({ msg: "Admin access only" });
  next();
}

function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => isAdmin(req, res, next));
}

module.exports = { verifyToken, isAdmin, verifyAdmin };

