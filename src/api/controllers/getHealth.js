const { getModuleLogger } = require('../../services/logService');
const { getServiceHealth } = require('../../services/getServiceHealh');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

const getHealth = async (services) => {
  const servicesArr = Object.values(services).map((service) => {
    const { name, prefix, url } = service;
    return { name, url: `${url}/${prefix}/health` };
  });

  const requests = servicesArr.map(getServiceHealth);
  const results = await Promise.allSettled([...requests]);

  const data = results.map((result) => {
    const { status, value, reason: e } = result;
    /* -- getServiceHealth error -- */
    if (status === 'rejected') throw e;
    /* -- if service ready -- */
    const { service, error } = value;
    if (!error) return value;
    /* -- if service not ready -- */
    const { type, message } = error;
    logger.warn({ service, type }, message);
    return value;
  });

  return data;
};

module.exports = { getHealth };
