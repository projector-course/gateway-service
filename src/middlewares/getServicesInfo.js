const { getServicesMap } = require('../services/servicesInfo');

async function getServicesInfo(ctx, next) {
  ctx.services = await getServicesMap();
  return next();
}

module.exports = { getServicesInfo };
