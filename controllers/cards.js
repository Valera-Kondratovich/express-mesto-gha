const Card = require('../models/card');

const getCards = ((req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(404).send({ message: 'Карточка не найдена', error: err.message }));
});

const createCard = ((req, res) => {
  const newCard = {
    ...req.body, owner: req.user._id
  };
  Card.create(newCard)
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки', error: err.message, err: err.name });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка', error: err.message, err: err.name });
    });
});

const delCard = ((req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('ошибка'))
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.message === 'ошибка') {
        res.status(404).send({ message: `Передан несуществующий _id:${req.params.cardId} карточки` });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Передан несуществующий _id:${req.params.cardId} карточки` });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка', error: err.message, err: err.name })});
});

const likeCard = ((req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('ошибка'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'ошибка') {
        res.status(404).send({ message: `Передан несуществующий _id:${req.params.cardId} карточки` });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка', error: err.message, err: err.name })});
});

const dislikeCard = ((req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('ошибка'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'ошибка') {
        res.status(404).send({ message: `Карточка по указанному id:${req.params.cardId} не найдена` });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка', error: err.message, err: err.name })});
});

module.exports = {
  getCards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
};
