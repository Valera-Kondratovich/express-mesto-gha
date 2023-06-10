const User = require('../models/user');

const INCORRECT_DATA_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const DEFAULT_ERROR = 500;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INCORRECT_DATA_ERROR).send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR).send({ message: `Пользователь по указанному id:${req.params.userId} не найден` });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR).send({ message: `Пользователь по указанному id:${req.user._id} не найден` });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(INCORRECT_DATA_ERROR).send({ message: 'Переданы некорректные данные при обновлении профиля' });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const updateAvatarUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR).send({ message: `Пользователь по указанному id:${req.user._id} не найден` });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(INCORRECT_DATA_ERROR).send({ message: 'Переданы некорректные данные при обновлении профиля' });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getUserById,
  createUser,
  getUsers,
  updateUser,
  updateAvatarUser,
};
