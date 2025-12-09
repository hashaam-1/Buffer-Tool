const axios = require("axios");

exports.postToFacebook = async (pageId, accessToken, message) => {
  const url = `https://graph.facebook.com/${pageId}/feed`;

  await axios.post(url, {
    message
  }, {
    params: {
      access_token: accessToken
    }
  });
};