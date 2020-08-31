const Twit = require('twit');
const fs = require('fs');
require('dotenv/config');

const twitterClient = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const getTargetTweet = async targetTweetId => {
  return twitterClient
    .get('statuses/show', { id: targetTweetId, tweet_mode: 'extended' })
    .then(result => {
      // @ts-ignore
      return result.data.full_text;
    })
    .catch(err => {
      console.log(err);
    });
};

const updateTweetWithMock = async (replyTargetId, text, img) => {
  let imgPath = fs.readFileSync(img, {
    encoding: 'base64',
  });
  return twitterClient.post(
    'media/upload',
    { media_data: imgPath },
    (err, media, response) => {
      if (err) {
        console.log('Error upload image: ', err);
      } else {
        twitterClient.post(
          'statuses/update',
          {
            status: text,
            auto_populate_reply_metadata: true,
            in_reply_to_status_id: replyTargetId,
            // @ts-ignore
            media_ids: media.media_id_string,
          },
          (err, tweet, res) => {
            if (err) {
              console.log('Error tweeting: ', err);
            } else {
              console.log(`Tweeted: ${text}`);
            }
          }
        );
      }
    }
  );
};

module.exports = { getTargetTweet, updateTweetWithMock };
