const { getModuleLogger } = require('../../services/logService');
const { findService } = require('./findService');
const { proxy } = require('../../utils/proxy');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function proxyService(options) {
  const {
    isAuth, prefix, path, search, headers, ...reqOptions
  } = options;

  const service = await findService({ prefix });
  if (!service) return null;

  const url = `${service.url}${path}${search}`;
  logger.debug(url);

  const headersWithToken = { ...headers };
  if (isAuth) Object.assign(headersWithToken, { 'x-service-token': service.token });

  return proxy({ ...reqOptions, url, headers: headersWithToken });
}

module.exports = { proxyService };
