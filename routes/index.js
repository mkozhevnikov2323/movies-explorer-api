const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.use(require('./signup'));
router.use(require('./signin'));

router.use(auth);
router.use(require('./users'));
router.use(require('./movies'));

router.all('/*', () => {
  throw new NotFoundError('Страница не найдена!');
});

module.exports = router;
