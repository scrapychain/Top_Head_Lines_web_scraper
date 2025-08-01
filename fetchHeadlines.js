const axios = require('axios');
const cheerio = require('cheerio');
const sites = require('./newsSources.json');

async function scrapeSite(site) {
  try {
    const response = await axios.get(site.url, { timeout: 10000 });
    const $ = cheerio.load(response.data);
    let headline = $('h1').first().text().trim();
    if (!headline) {
      headline = $('title').first().text().trim();
    }
    return { site: site.name, url: site.url, headline: headline || 'No headline found' };
  } catch (err) {
    return { site: site.name, url: site.url, headline: 'Unable to fetch headline' };
  }
}

async function fetchHeadlines() {
  const tasks = sites.map(scrapeSite);
  return Promise.all(tasks);
}

module.exports = fetchHeadlines;
