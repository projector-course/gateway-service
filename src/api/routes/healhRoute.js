const { getHealth } = require('../controllers/getHealth');

async function healthRoute(ctx) {
  ctx.log.debug('ROUTE: %s', ctx.path);
  let services = Object.values(ctx.services);
  services = services.map((service) => {
    const { name, prefix, url } = service;
    return { name, url: `${url}/${prefix}/health` };
  });
  ctx.body = await getHealth(services);
}

module.exports = { healthRoute };
