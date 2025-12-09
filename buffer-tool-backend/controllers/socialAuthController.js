const axios = require("axios");
const User = require("../models/User");

exports.facebookAuth = async (req, res) => {
  const redirectUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.FB_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.FB_REDIRECT_URI)}&scope=pages_manage_posts,pages_show_list,instagram_basic`;
  res.redirect(redirectUrl);
};

exports.facebookCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const tokenRes = await axios.get("https://graph.facebook.com/v18.0/oauth/access_token", {
      params: {
        client_id: process.env.FB_CLIENT_ID,
        client_secret: process.env.FB_CLIENT_SECRET,
        redirect_uri: process.env.FB_REDIRECT_URI,
        code,
      },
    });

    const accessToken = tokenRes.data.access_token;
    const pagesRes = await axios.get(`https://graph.facebook.com/me/accounts?access_token=${accessToken}`);
    const selectedPage = pagesRes.data.data[0];
    const userInfo = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`);
    const user = await User.findOne({ email: "test@example.com" });

    user.connectedAccounts.push({
      platform: "facebook",
      accessToken: selectedPage.access_token,
      pageId: selectedPage.id,
      accountId: userInfo.data.id,
      expiresAt: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
    });

    await user.save();
    res.send("Facebook account connected!");
  } catch (error) {
    console.error("Facebook OAuth Error", error.message);
    res.status(500).send("Facebook authentication failed.");
  }
};