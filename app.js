const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

const apps = require('./app-data.js');

app.get('/apps', (req, res) => {
  // ALL OUR CODE HERE
  const { sort, genre } = req.query;
  
  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res 
        .status(400)
        .send('Sort must be one of Rating or App');
    }
  }

  if (genre) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
      return res 
        .status(400)
        .send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card');
    }
  }

  if (sort) {
    results = apps.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  if (genre) {
    results = apps.filter(app => 
                        app.Genres.includes(genre)); 
  }

  res.json(results);
});

module.exports = app;