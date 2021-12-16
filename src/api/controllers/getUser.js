const { getModuleLogger } = require('../../services/logService');
const { findService } = require('./findService');
const { getJson } = require('../../utils/getJson');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

const prefix = 'users';

async function getUser(token) {
  const service = await findService({ prefix });
  if (!service) throw new Error('User service not found');

  const url = `${service.url}/${prefix}/me`;
  const headers = { 'x-token': token };
  logger.debug(url);

  return getJson(url, { headers });
}

module.exports = { getUser };
