const mongoose = require("mongoose");

const scheduledPostSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  platforms: [String],
  content: String,
  mediaUrls: [String],
  scheduledTime: Date,
  status: { type: String, default: "scheduled" },
  errorMessage: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ScheduledPost", scheduledPostSchema);