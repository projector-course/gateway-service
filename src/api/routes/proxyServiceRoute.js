const { proxyService } = require('../controllers/proxyService');

async function proxyServiceRoute(ctx, next) {
  const {
    path, search, method, headers, req: data,
  } = ctx;

  ctx.log.debug('ROUTE: %s', path);

  const match = path.match(/^\/([^/]+)/) || {};
  const prefix = match[1];
  if (!prefix) return next();

  const res = await proxyService({
    path,
    search,
    prefix,
    method,
    headers,
    data,
  });

  if (!res) return next();

  const { status: resStatus, headers: resHeaders, data: resData } = res;
  ctx.status = resStatus;
  ctx.body = resData;
  ctx.set(resHeaders);

  return next();
}

module.exports = { proxyServiceRoute };
