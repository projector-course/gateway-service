const Router = require('@koa/router');
const { healthRoute } = require('./routes/healhRoute');
// const { getService } = require('../middlewares/getService');
// const { serviceRoute } = require('./routes/serviceRoute');

const router = new Router();

router
  .get('/health', healthRoute);
// .use(async (ctx) => {
//   console.log(ctx.path);
//   ctx.body = 'RESPONSE';
// })
// .use(getService)
// .use(serviceRoute);

module.exports = { router };
