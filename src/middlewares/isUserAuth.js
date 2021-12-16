const { getUser } = require('../api/controllers/getUser');

async function isUserAuth(ctx, next) {
  const { path, headers } = ctx;

  const { 'x-token': token, 'x-service-token': serviceToken } = headers;
  if (serviceToken || !token) return next();

  if (/^\/users/.test(path)) return next();

  ctx.user = await getUser(token);

  return next();
}

module.exports = { isUserAuth };
