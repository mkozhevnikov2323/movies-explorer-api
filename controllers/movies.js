const Movie = require('../models/movie');
// const NotFoundError = require('../errors/not-found-err');
// const ForbiddenError = require('../errors/forbidden-err');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner = req.user._id,
    movieId = req.movie._id,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (movie === null) {
        // throw new NotFoundError('Фильм не найден!');
      }
      if (movie.owner.toString() !== req.user._id) {
        // throw new ForbiddenError('Нельзя удалить чужой фильм!');
      }
      return movie.remove();
    })
    .then(() => res.send({ message: 'Фильм удален!' }))
    .catch(next);
};
