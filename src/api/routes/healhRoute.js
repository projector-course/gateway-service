const { getHealth } = require('../controllers/getHealth');

async function healthRoute(ctx) {
  ctx.log.debug('ROUTE: %s', ctx.path);
  ctx.body = await getHealth();
}

module.exports = { healthRoute };
