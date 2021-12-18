const { getModuleLogger } = require('../../services/logService');
const { findService } = require('./findService');
const { SERVICE_KEY } = require('../../services/configService');
const { proxy } = require('../../utils/proxy');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function proxyService(options) {
  const {
    user, prefix, path, search, headers, ...reqOptions
  } = options;

  const service = await findService({ prefix });
  if (!service) return null;

  const url = `${service.url}${path}${search}`;
  logger.debug(url);

  const headersWithToken = { ...headers };
  if (user) Object.assign(headersWithToken, { 'x-service-key': SERVICE_KEY });

  return proxy({ ...reqOptions, url, headers: headersWithToken });
}

module.exports = { proxyService };
