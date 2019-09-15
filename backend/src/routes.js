const KoaRouter = require('koa-router');

const crud = require('./routes/crud');

const router = new KoaRouter();

router.use('/crud', crud.routes());

module.exports = router;
