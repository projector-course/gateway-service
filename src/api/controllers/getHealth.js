const { getModuleLogger } = require('../../services/logService');
const db = require('../../db/models');
const { getServiceHealth } = require('../../services/getServiceHealh');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

const getHealth = async () => {
  const servicesArr = await db.services.findAll()
    .then((result) => result.map(({ dataValues }) => dataValues));

  const services = servicesArr.map((service) => {
    const { name, prefix, url } = service;
    return { name, url: `${url}/${prefix}/health` };
  });

  const requests = services.map(getServiceHealth);
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
