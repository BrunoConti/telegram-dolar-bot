const { Telegraf } = require('telegraf');
const { Scrapper, URL } = require('./scrapper');

const bot = new Telegraf('6233571833:AAEp-zz0cnyzkooUQehv_rS7m1S5hYIRpOQ');

bot.start(ctx => {
  ctx.reply('Hello World');
});

bot.command('dolar', ctx => {
  Scrapper.getDollar()
  .then(({ dolarCompra, dolarVenta}) => {
    const message = `💵 DOLAR HOY 💵 \n\nCompra: ${dolarCompra} \nVenta: ${dolarVenta}`

    ctx.replyWithHTML(
      `<b>💵 DOLAR HOY 💵</b> \n\n👉🏻 Compra: ${dolarCompra}\n\n👉🏻  Venta: ${dolarVenta}\n\nFuente: <a href="${URL}">dolarhoy.com</a>`
    );
  })
  .catch(err => {
    ctx.reply(`Error message: ${err}`);
  });
});

bot.launch();
