const { getModuleLogger } = require('../../services/logService');
const { findService } = require('./findService');
const { proxy } = require('../../utils/proxy');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function proxyService(options) {
  const {
    prefix, path, search, ...reqOptions
  } = options;

  const service = await findService({ prefix });
  if (!service) return null;

  const url = `${service.url}${path}${search}`;
  logger.debug(url);

  return proxy({ ...reqOptions, url });
}

module.exports = { proxyService };
