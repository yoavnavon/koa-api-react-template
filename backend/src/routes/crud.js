const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function loadCourse(ctx, next) {
  ctx.state.course = await ctx.orm.course.findById(ctx.params.id);
  return next();
}
router.get('courses.list', '/', async (ctx) => {
  const coursesList = await ctx.orm.course.findAll();
  ctx.body = coursesList;
});


router.post('courses.create', '/', async (ctx) => {
  const course = ctx.orm.course.build(ctx.request.body);
  try {
    await course.save({ fields: ['code', 'name', 'description'] });
    ctx.body = course;
  } catch (validationError) {
    ctx.throw(400, 'Validation Error');
  }
});

router.patch('courses.update', '/:id', loadCourse, async (ctx) => {
  const { course } = ctx.state;
  try {
    const { code, name, description } = ctx.request.body;
    await course.update({ code, name, description });
    ctx.body = course;
  } catch (validationError) {
    ctx.throw(400, 'Validation Error');
  }
});

router.del('courses.delete', '/:id', loadCourse, async (ctx) => {
  const { course } = ctx.state;
  await course.destroy();
  ctx.status = 200;
});

module.exports = router;
