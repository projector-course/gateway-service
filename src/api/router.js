const Router = require('@koa/router');
const { healthRoute } = require('./routes/healhRoute');

const router = new Router({ prefix: '' });

router.get('/health', healthRoute);

module.exports = { router };
