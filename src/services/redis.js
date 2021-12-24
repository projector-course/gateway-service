const Redis = require('ioredis');
const { getModuleLogger } = require('./logService');

const logger = getModuleLogger(module);
logger.debug('SERVICE CREATED');

function init() {
  return new Redis({
    maxRetriesPerRequest: 5,
    retryStrategy(times) {
      if (times > 3) return null;
      return 2000;
    },
  }).on('error', (e) => logger.error(e));
}

module.exports = { init };
