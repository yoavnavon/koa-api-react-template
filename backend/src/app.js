const Koa = require('koa');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const koaFlashMessage = require('koa-flash-message').default;
const session = require('koa-session');
const override = require('koa-override-method');
const serve = require("koa-static");
const mount = require("koa-mount");
const KoaRouter = require('koa-router');
const api = require('./routes');
const orm = require('./models');

// App constructor
const app = new Koa();

app.keys = [
  'these secret keys are used to sign HTTP cookies',
  'to make sure only this app can generate a valid one',
  'and thus preventing someone just writing a cookie',
  'saying he is logged in when it\'s really not',
];

// expose ORM through context's prototype
app.context.orm = orm;
/**
 * Middlewares
 */

// expose running mode in ctx.state
app.use((ctx, next) => {
  ctx.state.env = ctx.app.env;
  return next();
});

// log requests
app.use(koaLogger());

// expose a session hash to store information across requests from same client
app.use(session({
  maxAge: 14 * 24 * 60 * 60 * 1000, // 2 weeks
}, app));

// flash messages support
app.use(koaFlashMessage);

// parse request body
app.use(koaBody({
  multipart: true,
  keepExtensions: true,
}));

app.use((ctx, next) => {
  ctx.request.method = override.call(ctx, ctx.request.body.fields || ctx.request.body);
  return next();
});



// Routing middleware
const router = new KoaRouter();
router.use('/api', api.routes());
app.use(router.routes());

// Serving react app
const static_pages = new Koa();
static_pages.use(serve("./build")); //serve the build directory
app.use(mount("/", static_pages));


module.exports = app;
