const config = require('./configuration');
const Memeify = require('./Memeify');
const TextFormatter = require('./TextFormatter');
const {
  getTargetTweet,
  updateTweetWithMock,
  updateTweet,
} = require('./twitterClient');
const memeGenerator = new Memeify();
const emojiRegex = require('emoji-regex');

async function tweetGeneratedMock(type, mention) {
  let targetTweetId = mention.in_reply_to_status_id_str;
  const targetTweet = await getTargetTweet(targetTweetId);

  const textFormatter = new TextFormatter(targetTweet);
  let imagePath = null;
  let mockTextResult = null;

  if (type == 'spongebob') {
    mockTextResult = textFormatter.mockText();
    imagePath = await memeGenerator.generateMeme(type, mockTextResult);
  } else if (type == 'khaleesi') {
    mockTextResult = textFormatter.mickTixt();
    imagePath = await memeGenerator.generateMeme(type, mockTextResult);
  }

  updateTweetWithMock(mention.id_str, mockTextResult, imagePath);
}

async function tweetMockEmoji(mention, emoji) {
  let targetTweetId = mention.in_reply_to_status_id_str;
  const targetTweet = await getTargetTweet(targetTweetId);

  const textFormatter = new TextFormatter(targetTweet);
  const textTransformoji = textFormatter.transformoji(emoji);

  updateTweet(mention.id_str, textTransformoji);
}

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

  let targetUser = mention.in_reply_to_user_id_str;
  targetUser = Number(targetUser);

  if (config.exclusiveIds.includes(targetUser)) {
    return;
  } else {
    texts.map(text => {
      if (text.match(/\bplease/g)) {
        if (text.length > 6) {
          // @ts-ignore
          const regex = emojiRegex();
          let match = regex.exec(text);
          if (match) {
            let emoji = match[0];
            tweetMockEmoji(mention, emoji);
          } else {
            return;
          }
        } else if (text.length == 6) {
          tweetGeneratedMock('spongebob', mention);
        }
      } else if (text.match(/\bpliis/g)) {
        tweetGeneratedMock('khaleesi', mention);
      }
    });
  }
}

module.exports = { replyWithMock };
