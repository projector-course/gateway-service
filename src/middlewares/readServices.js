const { getModuleLogger } = require('../services/logService');
const db = require('../db/models');

const logger = getModuleLogger(module);
logger.debug('MIDDLEWARE CREATED');

const readServices = async (ctx, next) => {
  ctx.services = await db.services.readCacheOrDb();

  return next();
};

module.exports = { readServices };
