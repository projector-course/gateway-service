const Redis = require('ioredis');
const { getModuleLogger } = require('./logService');

const logger = getModuleLogger(module);
logger.debug('SERVICE CREATED');

let redis;

function init() {
  if (redis) return redis;
  redis = new Redis({
    maxRetriesPerRequest: 5,
    retryStrategy(times) {
      if (times > 3) return null;
      return 2000;
    },
  }).on('error', (e) => logger.error(e));
  return redis;
}

module.exports = { init };
