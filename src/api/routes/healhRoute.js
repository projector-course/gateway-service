const { getHealth } = require('../controllers/getHealth');

async function healthRoute(ctx) {
  const { path, services } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  ctx.body = await getHealth(services);
}

module.exports = { healthRoute };
