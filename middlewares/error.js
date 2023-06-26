const INCORRECT_DATA_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const DEFAULT_ERROR = 500;

const errorHandler = (err, req, res, next) => {
  // console.log(err.body);
  if (err.message === 'userNotFound') {
    res
      .status(NOT_FOUND_ERROR)
      .send({
        message: 'Пользователь по указанному id не найден',
      });
    return;
  }
  if (err.message === 'cardNotFound') {
    res
      .status(NOT_FOUND_ERROR)
      .send({
        message: 'Карточка по указанному id не найдена',
      });
    return;
  }
  if (err.message === 'incorrectEmail') {
    res
      .status(CONFLICT_ERROR)
      .send({
        message: 'Такой email уже зарегистрирован в системе',
      });
    return;
  }
  if (err.message === 'incorrectData' || err.name === 'JsonWebTokenError') {
    res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: 'Введены неправильная почта или пароль' });
    return;
  }
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res
      .status(INCORRECT_DATA_ERROR)
      .send({ message: 'Переданы некорректные данные' });
    return;
  }

  res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
};

module.exports = errorHandler;
