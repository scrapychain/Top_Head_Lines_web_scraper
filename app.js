const express = require('express');
const fetchHeadlines = require('./fetchHeadlines');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const headlines = await fetchHeadlines();
  res.render('home', { headlines });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
