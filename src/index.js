const Koa = require('koa');
const { PORT, BASE_URL, SERVICE_NAME } = require('./services/configService');
const { getModuleLogger } = require('./services/logService');
const { getMetrics } = require('./middlewares/getMetrics');
const { koaLogger } = require('./middlewares/koaLogger');
const { router } = require('./api/router');
const { proxyServiceRoute } = require('./api/routes/proxyServiceRoute');

const logger = getModuleLogger(module);
logger.debug('APP CREATED');

new Koa()
  .use(getMetrics)
  .use(koaLogger)
  .use(proxyServiceRoute)
  .use(router.routes())
  .use(router.allowedMethods())
  .on('error', (e) => logger.error(e))
  .listen(PORT, () => logger.info(`${SERVICE_NAME} is running on ${BASE_URL}`));

process.on('unhandledRejection', (e) => {
  logger.error(e, 'Unhandled rejection at promise');
  logger.info('Server is still running...');
});

process.on('uncaughtException', (e) => {
  logger.fatal(e, 'Uncaught exception');
  process.nextTick(() => process.exit());
});
