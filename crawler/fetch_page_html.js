const rp = require('request-promise');
const cheerio = require('cheerio')
const options = { transform: body => cheerio.load(body) };
const requestHtml = url => rp({...options, uri: url})
module.exports = {
  getPageHtml: requestHtml,
  getMultiplePagesHtml: urls => Promise.all(urls.map(url => requestHtml(url)))
}