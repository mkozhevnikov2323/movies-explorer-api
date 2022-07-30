require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
// const auth = require('./middlewares/auth');
// const { requestLogger, errorLogger } = require('./middlewares/logger');
// const cors = require('./middlewares/cors');
// const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(requestLogger);
// app.use(cors);

app.use('signup', require('./routes/signup'));
app.use('signin', require('./routes/signin'));

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

// app.patch('/*', () => {
//   throw new NotFoundError('Страница не найдена!');
// });

// app.use(errorLogger);

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с данным E-mail присутствует в базе.' });
  } else if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Некорректный email или длина пароля менее 8 символов.' });
  } else if (err.name === 'CastError') {
    res.status(400).send({ message: 'Некорректный id.' });
  } else {
    res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? ('На сервере произошла ошибка')
          : message,
      });
  }
});

app.listen(PORT);
