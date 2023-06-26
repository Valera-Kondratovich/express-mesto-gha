const jwt = require('jsonwebtoken');
const Card = require('../models/card');
const { login } = require('./users');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const newCard = {
    ...req.body,
    owner: req.user._id,
  };
  Card.create(newCard)
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const delCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new Error('cardNotFound'))
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        Card.findByIdAndRemove(req.params.cardId);
        res.status(200).send({ message: 'Карточка удалена' });
      } else res.status(403).send({ message: 'Нет прав на удаления карточки' }); //обработка ошибок
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('cardNotFound'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('cardNotFound'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
};
