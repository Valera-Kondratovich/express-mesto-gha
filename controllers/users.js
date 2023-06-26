const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    throw new Error('incorrectData');
  }
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Error('incorrectData');
      }
      bcrypt.compare(String(password), user.password).then((matched) => {
        if (matched) {
          const token = jwt.sign({ _id: user._id }, process.env["JWT_SECRET"]);
          res.cookie('jwt', token, {
            maxAge: 360000,
            httpOnly: true,
            sameSite: true,
          });
          res.status(200).send(user);
        } else {
          throw new Error('incorrectData');
        }
      });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    throw new Error('incorrectData');
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      throw new Error('incorrectEmail');
    }
  });
  bcrypt
    .hash(String(req.body.password), 10)
    .then((hash) => {
      User.create({
        ...req.body,
        password: hash,
      }).then((user) => {
        res.status(201).send(user);
      });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('userNotFound'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, avatar: req.body.avatar, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateAvatarUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  login,
  getUserById,
  createUser,
  getUsers,
  updateUser,
  updateAvatarUser,
};
