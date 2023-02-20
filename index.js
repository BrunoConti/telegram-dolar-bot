const bot = require('./src/bot');

if(process.env.ENVIRONMENT === 'Production') {
  bot.launch({
    webhook: {
        domain: process.env.DOMAIN,
        port: process.env.PORT || 8000,
    }
  }).then(() => {
    console.info(`The bot ${bot.botInfo.username} is running on server`);
  });
} else {
  bot.launch();
}
