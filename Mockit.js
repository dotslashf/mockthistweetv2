const config = require('./configuration');
const Memeify = require('./Memeify');
const TextFormatter = require('./TextFormatter');
const {
  getTargetTweet,
  updateTweetWithMock,
  updateTweet,
} = require('./twitterClient');
const memeGenerator = new Memeify();

async function generateMock(type, mention) {
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

async function generateMockEmoji(mention, emoji) {
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
          generateMockEmoji(mention, text.substr(-2));
        } else {
          generateMock('spongebob', mention);
        }
      } else if (text.match(/\bpliis/g)) {
        generateMock('khaleesi', mention);
      }
    });
  }
}

module.exports = { replyWithMock };
