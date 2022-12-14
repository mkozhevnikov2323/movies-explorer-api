const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'()*+,;=]{2,}/mi),
    trailerLink: Joi.string().required().pattern(/https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'()*+,;=]{2,}/mi),
    thumbnail: Joi.string().required().pattern(/https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'()*+,;=]{2,}/mi),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/movies/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().alphanum().hex()
      .length(24),
  }),
}), deleteMovie);

module.exports = router;
