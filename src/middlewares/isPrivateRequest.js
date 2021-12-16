const crypto = require('../utils/crypto');

async function isPrivateRequest(ctx, next) {
  const { headers } = ctx;
  const { 'x-service-token': token } = headers;

  if (!token) return next();

  crypto.checkToken(token);

  return next();
}

module.exports = { isPrivateRequest };
