const { proxyService } = require('../controllers/proxyService');

async function proxyServiceRoute(ctx, next) {
  const {
    path, search, method, headers, req: data, user,
  } = ctx;

  ctx.log.debug('ROUTE: %s', path);

  const match = path.match(/^\/([^/]+)/) || {};
  const prefix = match[1];
  if (!prefix) return next();

  const { 'x-service-token': serviceToken } = headers;
  const isAuth = Boolean(user) || Boolean(serviceToken);

  const res = await proxyService({
    path,
    search,
    prefix,
    method,
    headers,
    data,
    isAuth,
  });

  if (!res) return next();

  const { status: resStatus, headers: resHeaders, data: resData } = res;
  ctx.status = resStatus;
  ctx.body = resData;
  ctx.set(resHeaders);

  return next();
}

module.exports = { proxyServiceRoute };
