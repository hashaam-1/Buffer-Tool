const express = require("express");
const router = express.Router();
const { facebookAuth, facebookCallback } = require("../controllers/socialAuthController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/connect/facebook", (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // pass control to actual Facebook auth handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}, facebookAuth);
router.get("/callback/facebook", facebookCallback);

module.exports = router;