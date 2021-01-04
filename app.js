const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

const apps = require('./app-data.js');

app.get('/apps', (req, res) => {
  // ALL OUR CODE HERE
  res.json(apps);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});