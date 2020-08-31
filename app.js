const { Autohook } = require('twitter-autohook');
require('dotenv/config');

(async start => {
  try {
    const webhookURL = `https://${process.env.PROJECT_DOMAIN}.glitch.me/webhook`;

    const webhook = new Autohook({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      token: process.env.ACCESS_TOKEN,
      token_secret: process.env.ACCESS_TOKEN_SECRET,
      env: process.env.WEBHOOK_ENV,
      ngrok_secret: process.env.NGROK,
      port: process.env.PORT,
    });

    // @ts-ignore
    webhook.on('event', async event => {
      if (event.tweet_create_events) {
        let mention = event.tweet_create_events.shift();
        const texts = mention.text.split(' ');
        console.log(texts);
        if (texts.includes('please')) {
          console.log('i shall mock this');
        }
      }
    });

    await webhook.removeWebhooks();

    await webhook.start();

    await webhook.subscribe({
      oauth_token: process.env.ACCESS_TOKEN,
      oauth_token_secret: process.env.ACCESS_TOKEN_SECRET,
    });
  } catch (e) {
    // Display the error and quit
    console.error(e);
    process.exit(1);
  }
})();
