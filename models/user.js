const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    about: {
      type: String,
      default: 'Исследователь',
      required: [true, 'Поле "about" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "about" - 2'],
      maxlength: [30, 'Максимальная длина поля "about" - 30'],
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      required: [true, 'Поле "avatar" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      lowercase: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Ввели некорректный email',
      },
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Поле "password" должно быть заполнено'],
    },
  },
  { versionKey: false },
);

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
