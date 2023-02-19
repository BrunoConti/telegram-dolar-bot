const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'https://dolarhoy.com/';

class Scrapper {
  static getDollar = async () => {
    try {
      const response = await axios.get(URL);
      const $ = cheerio.load(response.data);
      const dolarCompra = $('.is-5 .compra .val').text();
      const dolarVenta = $('.is-5 .venta .val').text();
  
      return { dolarCompra, dolarVenta };
  
    } catch(error) {
      console.error(error);
    }
  };
}

module.exports = { Scrapper, URL };
