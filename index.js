const bot = require('./src/bot');

require('dotenv').config();

if(process.env.ENVIRONMENT === 'Production') {
  console.log('Running in prod')
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
