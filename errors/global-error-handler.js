// eslint-disable-next-line no-unused-vars
const globalErrorHandler = ((err, req, res, next) => {
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

module.exports = globalErrorHandler;
