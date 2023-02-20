const { createServer } = require('http');
const bot = require('./src/bot');

require('dotenv').config();

if(process.env.ENVIRONMENT === 'Production') {
  createServer(bot.createWebhook({ domain: process.env.DOMAIN })).listen(process.env.PORT || 8000);
} else {
  bot.launch();
}
