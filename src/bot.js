const { Telegraf } = require('telegraf');
const { Scrapper, URL } = require('./scrapper');

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.catch((err, ctx) => {
  console.error(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

bot.start(ctx => {
  ctx.reply('Bienvenid@ a DOLAR-BOT ๐ค\n\n Accionรก /help para obtener el listado de comandos ๐');
});

bot.help(ctx => {
  ctx.replyWithHTML(`<b>Comandos</b> \n\n๐๐ป /start - comenzar el bot\n๐๐ป /help - ayuda\n๐๐ป /dolar - obtener la cotizaciรณn del dolar blue`);
});

bot.command('dolar', async ctx => {
  await Scrapper.getDollar()
  .then(({ dolarCompra, dolarVenta }) => {
    ctx.replyWithHTML(
      `<b>๐ต DOLAR HOY ๐ต</b> \n\n๐๐ป Compra: ${dolarCompra}\n\n๐๐ป Venta: ${dolarVenta}\n\nFuente: <a href="${URL}">dolarhoy.com</a>`
    );
  })
  .catch(err => {
    ctx.reply(`Error message: ${err}`);
  });
});

module.exports = bot;
