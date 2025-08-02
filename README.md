# Top Headlines Web Scraper

This application scrapes the home pages of the top 100 US news websites and displays their latest headline on the home page.

## Setup

Install dependencies:

```
npm install
```

The scraper sends requests with a browser-like `User-Agent` header and checks
common meta tags (`og:title` and `twitter:title`) in addition to `<h1>` and
`<title>` elements to increase the odds of retrieving a meaningful headline.

Run the application:

```
node app.js
```

The home page will list each site with the headline that was found. If a site cannot be reached or no headline is found, a message will be shown instead.
