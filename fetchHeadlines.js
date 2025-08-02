const axios = require('axios');
const cheerio = require('cheerio');
const sites = require('./newsSources.json');

async function scrapeSite(site) {
  try {
    // Many news sites block requests that do not look like a real browser.
    // Provide a common User-Agent and fall back to a couple of meta tags
    // in case the page does not expose a standard <h1> element.
    const response = await axios.get(site.url, {
      timeout: 10000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    const $ = cheerio.load(response.data);

    // Try a couple of different strategies for finding a headline
    let headline =
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="twitter:title"]').attr('content') ||
      $('h1').first().text() ||
      $('title').first().text();

    headline = headline ? headline.trim() : 'No headline found';
    return { site: site.name, url: site.url, headline };
  } catch (err) {
    return { site: site.name, url: site.url, headline: 'Unable to fetch headline' };
  }
}

async function fetchHeadlines() {
  const tasks = sites.map(scrapeSite);
  return Promise.all(tasks);
}

module.exports = fetchHeadlines;
