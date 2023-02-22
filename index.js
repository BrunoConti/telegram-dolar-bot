const express = require('express');
const cors = require('cors');
const bot = require('./src/bot');

require('dotenv').config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

if(process.env.ENVIRONMENT === 'Production') {
  app.use(bot.createWebhook({ domain: process.env.DOMAIN }));
  app.listen(PORT, () => console.log('Listening on port', PORT));
} else {
  bot.launch();
}
