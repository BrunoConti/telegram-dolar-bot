const express = require('express');
const cors = require('cors');
const bot = require('./src/bot');

require('dotenv').config();
const PORT = process.env.PORT || 8000;

if(process.env.ENVIRONMENT === 'Production') {
  const app = express();
  app.use(cors());

  bot.telegram.setWebhook(`${process.env.DOMAIN}/secret-path`);
  app.use(bot.webhookCallback('/secret-path'));

  app.get('/', (req, res) => {
    res.send('💵 DOLAR BOT 💵')
  });

  app.post(`/secret-path`, (req, res) => {
    console.log(req.body)
    return bot.handleUpdate(req.body, res)
})

  app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });

} else {
  bot.launch();
}
