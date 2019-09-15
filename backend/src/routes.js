const KoaRouter = require('koa-router');

const index = require('./routes/index');
const courses = require('./routes/crud');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/courses', courses.routes());

module.exports = router;
