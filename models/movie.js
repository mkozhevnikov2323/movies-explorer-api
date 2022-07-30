const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'()*+,;=]{2,}/gmi.test(v);
      },
      message: 'Ссылка некорректна!',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'()*+,;=]{2,}/gmi.test(v);
      },
      message: 'Ссылка некорректна!',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'()*+,;=]{2,}/gmi.test(v);
      },
      message: 'Ссылка некорректна!',
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    ref: 'movie',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
