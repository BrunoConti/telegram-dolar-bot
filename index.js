const express = require('express');
const cors = require('cors');
const bot = require('./src/bot');

require('dotenv').config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

if(process.env.ENVIRONMENT === 'Production') {
  app.use(bot.webhookCallback(process.env.DOMAIN));
  bot.telegram.setWebhook(process.env.DOMAIN);

  app.get('/', (req, res) => {
    res.send('💵 DOLAR BOT 💵')
  });

  app.post('/', () => {
    bot.command('dolar', ctx => {
      Scrapper.getDollar()
      .then(({ dolarCompra, dolarVenta }) => {
        ctx.replyWithHTML(
          `<b>💵 DOLAR HOY 💵</b> \n\n👉🏻 Compra: ${dolarCompra}\n\n👉🏻  Venta: ${dolarVenta}\n\nFuente: <a href="${URL}">dolarhoy.com</a>`
        );
      })
      .catch(err => {
        ctx.reply(`Error message: ${err}`);
      });
    });
  });

  app.listen(PORT, () => {
    console.log('listening on port', PORT);
  })
} else {
  bot.launch();
}
