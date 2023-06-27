const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(new UnauthorizedError('Необходима авторизация'));
      return;
    }
  }
  req.user = payload;
  next();
};

module.exports = auth;
