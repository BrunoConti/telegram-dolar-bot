const { Telegraf } = require('telegraf');
const { Scrapper, URL } = require('./scrapper');

require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN);

if(process.env.ENVIRONMENT === "Production") {
  bot.startWebhook('/https://telegram-dolar-bot.vercel.app/', null, 8000);
}

bot.start(ctx => {
  ctx.reply('Hello World');
});

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

module.exports = bot;