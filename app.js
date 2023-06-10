// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Слушаю порт 3000');
});
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6483541f77b845b1b68f135b',
  };

  next();
});
app.use(routes);
