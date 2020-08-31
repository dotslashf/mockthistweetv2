const config = require('./configuration');
const Memeify = require('./Memeify');
const TextFormatter = require('./TextFormatter');
const { getTargetTweet, updateTweetWithMock } = require('./twitterClient');
const memeGenerator = new Memeify();

async function replyWithMock(event) {
  if (!event.tweet_create_events) {
    return;
  }

  const mention = event.tweet_create_events.shift();
  const texts = mention.text.split(' ');

  if (texts.length <= 1) {
    return;
  }

  if (texts.includes('RT')) {
    return;
  }

  if (texts.includes('please')) {
    let targetUser = mention.in_reply_to_user_id_str;
    targetUser = Number(targetUser);

    if (config.exclusive_ids.includes(targetUser)) {
      return;
    } else {
      let targetTweetId = mention.in_reply_to_status_id_str;
      const targetTweet = await getTargetTweet(targetTweetId);

      const textFormatter = new TextFormatter(targetTweet);
      const mockText = textFormatter.mockText();

      const imagePath = await memeGenerator.generateMeme('spongebob', mockText);

      updateTweetWithMock(mention.id_str, mockText, imagePath);
    }
  }
}

module.exports = { replyWithMock };
