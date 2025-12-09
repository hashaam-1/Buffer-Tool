const mongoose = require("mongoose");

const connectedAccountSchema = new mongoose.Schema({
  platform: String,
  accessToken: String,
  refreshToken: String,
  accountId: String,
  pageId: String,
  expiresAt: Date
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  connectedAccounts: [connectedAccountSchema]
});

module.exports = mongoose.model("User", userSchema);