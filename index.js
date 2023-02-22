const express = require('express');
const cors = require('cors');
const bot = require('./src/bot');

require('dotenv').config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

if(process.env.ENVIRONMENT === 'Production') {
  app.use(bot.webhookCallback('/'))
  bot.telegram.setWebhook(Process.env.DOMAIN)

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.listen(PORT, () => {
    console.log('listening on port', PORT);
  })
} else {
  bot.launch();
}
