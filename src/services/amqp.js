const rabbit = require('amqplib');
const { getModuleLogger } = require('./logService');
const {
  AMQP_HOST,
  AMQP_EXCHANGE_TYPE,
  AMQP_EXCHANGE_NAME,
  AMQP_QUEUE_NAME,
  AMQP_EVENT,
} = require('./configService');

const logger = getModuleLogger(module);
logger.debug('SERVICE CREATED');

async function initAmqp() {
  const connection = await rabbit.connect(AMQP_HOST);
  const channel = await connection.createChannel();
  logger.debug('AMQP channel created');

  await channel.assertExchange(AMQP_EXCHANGE_NAME, AMQP_EXCHANGE_TYPE);
  const queue = await channel.assertQueue(AMQP_QUEUE_NAME);
  await channel.bindQueue(queue.queue, AMQP_EXCHANGE_NAME, AMQP_EVENT);
}

module.exports = { initAmqp };
