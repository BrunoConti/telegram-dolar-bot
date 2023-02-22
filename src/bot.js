const { Telegraf } = require('telegraf');
const { Scrapper, URL } = require('./scrapper');

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.catch((err, ctx) => {
  console.error(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

bot.start(ctx => {
  ctx.reply('Bienvenid@ a DOLAR-BOT 🤖\n\n Accioná /help para obtener el listado de comandos 🚀');
});

bot.help(ctx => {
  ctx.replyWithHTML(`<b>Comandos</b> \n\n👉🏻 /start - comenzar el bot\n👉🏻 /help - ayuda\n👉🏻 /dolar - obtener la cotización del dolar blue`);
});

bot.command('dolar', async ctx => {
  await Scrapper.getDollar()
  .then(({ dolarCompra, dolarVenta }) => {
    ctx.replyWithHTML(
      `<b>💵 DOLAR HOY 💵</b> \n\n👉🏻 Compra: ${dolarCompra}\n\n👉🏻 Venta: ${dolarVenta}\n\nFuente: <a href="${URL}">dolarhoy.com</a>`
    );
  })
  .catch(err => {
    ctx.reply(`Error message: ${err}`);
  });
});

module.exports = bot;
