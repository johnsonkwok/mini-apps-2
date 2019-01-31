const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const request = require('request');

app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('tiny'));

app.get('/bpi', (req, res) => {
  request.get('https://api.coindesk.com/v1/bpi/historical/close.json', (err, response, body) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }
    res.send(body);
  });
});

app.listen(3000, () => console.log(`App listening on port 3000`))

