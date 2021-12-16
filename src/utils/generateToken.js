const { SERVICE_NAME } = require('../services/configService');
const crypto = require('./crypto');

const data = { service: SERVICE_NAME };
const token = crypto.createToken({ data }, '1d');
// eslint-disable-next-line no-console
console.log(token);
