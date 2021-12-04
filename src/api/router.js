const Router = require('@koa/router');
const { healthRoute } = require('./routes/healhRoute');

const router = new Router();

router.get('/health', healthRoute);

module.exports = { router };
