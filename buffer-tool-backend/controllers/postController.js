const ScheduledPost = require("../models/ScheduledPost");

exports.schedulePost = async (req, res) => {
  try {
    const { content, platforms, mediaUrls, scheduledTime } = req.body;
    const post = await ScheduledPost.create({
      userId: req.user._id,
      platforms,
      content,
      mediaUrls,
      scheduledTime,
    });
    res.status(201).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await ScheduledPost.find({ userId: req.user._id });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};