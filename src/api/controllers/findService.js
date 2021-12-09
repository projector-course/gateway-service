const { getModuleLogger } = require('../../services/logService');
const db = require('../../db/models');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function findService({ prefix }) {
  const result = await db.services.findOne(
    { where: { prefix } },
  );

  const { dataValues: service } = result || {};

  return service;
}

module.exports = { findService };
