require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const NotFoundError = require('./errors/not-found-err');
const globalErrorHandler = require('./errors/global-error-handler');

const { PORT = 3000, NODE_ENV, DATA_BASE } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production'
  ? DATA_BASE
  : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors);

app.use(require('./routes/signup'));
app.use(require('./routes/signin'));

app.use(auth);
app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.patch('/*', () => {
  throw new NotFoundError('Страница не найдена!');
});

app.use(errorLogger);
app.use(errors());
app.use(globalErrorHandler);

app.listen(PORT);
