// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const routes = require('./routes/index');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Слушаю порт 3000');
});
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6483541f77b845b1b68f135b',
  };

  next();
});
app.use(routes);
