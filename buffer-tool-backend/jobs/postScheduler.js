const cron = require("node-cron");
const ScheduledPost = require("../models/ScheduledPost");
const User = require("../models/User");
const { postToFacebook } = require("../utils/SocialPoster");

const runPostScheduler = () => {
  cron.schedule("* * * * *", async () => {
    const posts = await ScheduledPost.find({
      scheduledTime: { $lte: new Date() },
      status: "scheduled"
    });

    for (const post of posts) {
      const user = await User.findById(post.userId);

      try {
        for (const platform of post.platforms) {
          if (platform === "facebook") {
            const account = user.connectedAccounts.find(a => a.platform === "facebook");
            await postToFacebook(account.pageId, account.accessToken, post.content);
          }
        }

        post.status = "posted";
        await post.save();
      } catch (err) {
        post.status = "failed";
        post.errorMessage = err.message;
        await post.save();
      }
    }
  });
};

module.exports = runPostScheduler;