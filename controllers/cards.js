const Card = require('../models/card');

const INCORRECT_DATA_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const DEFAULT_ERROR = 500;

const getCards = ((req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(INCORRECT_DATA_ERROR).send({ message: 'Переданы некорректные данные при создании карточки' }));
});

const createCard = ((req, res) => {
  const newCard = {
    ...req.body, owner: req.user._id,
  };
  Card.create(newCard)
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INCORRECT_DATA_ERROR).send({ message: 'Переданы некорректные данные при создании карточки' });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
});

const delCard = ((req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('cardNotFound'))
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.message === 'cardNotFound') {
        res.status(NOT_FOUND_ERROR).send({ message: `Передан несуществующий _id:${req.params.cardId} карточки` });
        return;
      }
      if (err.name === 'CastError') {
        res.status(INCORRECT_DATA_ERROR).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
});

const likeCard = ((req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('cardNotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'cardNotFound') {
        res.status(NOT_FOUND_ERROR).send({ message: `Передан несуществующий _id:${req.params.cardId} карточки` });
        return;
      }
      if (err.name === 'CastError') {
        res.status(INCORRECT_DATA_ERROR).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
});

const dislikeCard = ((req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('cardNotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'cardNotFound') {
        res.status(NOT_FOUND_ERROR).send({ message: `Карточка по указанному id:${req.params.cardId} не найдена` });
        return;
      }
      if (err.name === 'CastError') {
        res.status(INCORRECT_DATA_ERROR).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
});

module.exports = {
  getCards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
};
