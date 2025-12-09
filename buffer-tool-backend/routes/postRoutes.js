const express = require("express");
const router = express.Router();
const { schedulePost, getAllPosts } = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/schedule", authMiddleware, schedulePost);
router.get("/", authMiddleware, getAllPosts);

module.exports = router;