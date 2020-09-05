const config = require('./configuration');
const Memeify = require('./Memeify');
const TextFormatter = require('./TextFormatter');
const {
  getTargetTweet,
  updateTweetWithMock,
  updateTweet,
  isFollower,
} = require('./twitterClient');
const memeGenerator = new Memeify();
const emojiRegex = require('emoji-regex');
const upsidedown = require('upsidedown');

async function tweetGeneratedMock(mention, type) {
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

async function tweetMockUpsidedown(mention) {
  let targetTweetId = mention.in_reply_to_status_id_str;
  const targetTweet = await getTargetTweet(targetTweetId);

  const textUpsidedown = upsidedown(targetTweet);

  updateTweet(mention.id_str, textUpsidedown);
}

async function checkMention(mention) {
  let targetUser = mention.in_reply_to_user_id_str;
  let requesterUser = mention.user.id_str;
  targetUser = Number(targetUser);

  let isFollowerRes = await isFollower(requesterUser);

  // @ts-ignore
  if (!isFollowerRes) {
    return {
      isFollower: false,
      targetUser: targetUser,
    };
  } else {
    return {
      isFollower: true,
      targetUser: targetUser,
    };
  }
}

async function pleaseMethod(mention, method, emoji = null) {
  if (method == 'please') {
    tweetGeneratedMock(mention, 'spongebob');
  } else if (method == 'emoji') {
    tweetMockEmoji(mention, emoji);
  } else if (method == 'upsidedown') {
    tweetMockUpsidedown(mention);
  }
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

  let { isFollower, targetUser } = await checkMention(mention);

  if (!isFollower) {
    console.log('Skipped not follower');
    return;
  } else {
    texts.map(async text => {
      if (text.match(/\bplease/g)) {
        if (config.exclusiveIds.includes(targetUser)) {
          return;
        } else {
          if (text.length == 6) {
            await pleaseMethod(mention, 'please');
          } else if (text.length > 6) {
            // @ts-ignore
            const regex = emojiRegex();
            let match = regex.exec(text);
            if (match) {
              let emoji = match[0];
              await pleaseMethod(mention, 'emoji', emoji);
            } else if (text.match(/\bpleaseud/g)) {
              await pleaseMethod(mention, 'upsidedown');
            }
          }
        }
      } else if (text.match(/\bpliisi/g)) {
        if (config.exclusiveIds.includes(targetUser)) {
          return;
        } else {
          tweetGeneratedMock(mention, 'khaleesi');
        }
      }
    });
  }
}

module.exports = { replyWithMock };
