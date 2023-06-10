const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка', error: err.message }));
};

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя', error: err.message });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка', error: err.message });
    });
};

const getUserById = (req, res)=>{
  User.findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch((err)=>{
      if (err.name === 'CastError') {
        res.status(404).send({message: `Пользователь по указанному id:${req.params.userId} не найден` });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка', error: err.message, err: err.name })});
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err)=>{
      if (err.name === 'CastError') {
        res.status(404).send({message: `Пользователь по указанному id:${req.user._id} не найден` });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля', error: err.message });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка', error: err.message, err: err.name })});
};

const updateAvatarUser = (req, res) =>{
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({message: `Пользователь по указанному id:${req.user._id} не найден` });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля', error: err.message });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка', error: err.message, err: err.name });
    });
};

module.exports = {
  getUserById,
  createUser,
  getUsers,
  updateUser,
  updateAvatarUser,
};
