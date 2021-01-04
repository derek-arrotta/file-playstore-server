const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

const apps = require('./app-data.js');

app.get('/apps', (req, res) => {
  // ALL OUR CODE HERE
  const { sort } = req.query;
  
  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res 
        .status(400)
        .send('Sort must be one of title or rank');
    }
  }

  if (sort) {
    apps.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(apps);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});