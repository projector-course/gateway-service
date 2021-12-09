const { proxyService } = require('../controllers/proxyService');
const { VerificationError } = require('../../errors/verificationError');
const { HttpRequestError, REQUEST_ERROR_TYPE } = require('../../errors/httpRequestError');

async function proxyServiceRoute(ctx, next) {
  const {
    path, search, method, headers, req: data,
  } = ctx;

  ctx.log.debug('ROUTE: %s', path);

  const match = path.match(/^\/([^/]+)/) || {};
  const prefix = match[1];
  if (!prefix) return next();

  const options = {
    path,
    search,
    prefix,
    method,
    headers,
    data,
  };

  let res;
  try {
    res = await proxyService(options);
  } catch (e) {
    if (e instanceof VerificationError) return next();
    if (!(e instanceof HttpRequestError)) throw e;
    if (e.type === REQUEST_ERROR_TYPE.NETWORK_ERROR) ctx.throw(503);
  }

  const { status: resStatus, headers: resHeaders, data: resData } = res;
  ctx.status = resStatus;
  ctx.body = resData;
  ctx.set(resHeaders);

  return next();
}

module.exports = { proxyServiceRoute };
