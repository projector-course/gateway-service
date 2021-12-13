require('dotenv-defaults').config();
const settings = require('../settings');

/* -- general -- */
const { STAGE } = settings;
const NODE_ENV = process.env.NODE_ENV || STAGE.DEVELOPMENT;

/* -- server -- */
const { HOST, PORT } = process.env;
const BASE_URL = `http://${HOST}:${PORT}`;

/* -- logger settings -- */
const { LOGGER_TARGET, LOGGER_LEVEL } = settings;
const { LOG_TARGET, LOG_LEVEL } = process.env;
const { isTTY } = process.stdout;

let logTarget = NODE_ENV !== STAGE.PRODUCTION && LOG_TARGET ? LOG_TARGET : LOGGER_TARGET.STDOUT;
if (logTarget === LOGGER_TARGET.CONSOLE && !isTTY) logTarget = LOGGER_TARGET.STDOUT;
const logLevel = NODE_ENV !== STAGE.PRODUCTION && LOG_LEVEL ? LOG_LEVEL : LOGGER_LEVEL.INFO;

/* -- db config -- */
const {
  DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT,
} = process.env;

const DB = {
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  define: {
    freezeTableName: true,
  },
};

module.exports = {
  ...process.env,
  ...settings,
  NODE_ENV,
  BASE_URL,
  LOG_TARGET: logTarget,
  LOG_LEVEL: logLevel,
  [NODE_ENV]: DB,
};
