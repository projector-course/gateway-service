const { proxy } = require('../utils/proxy');
const { HttpRequestError } = require('../errors/httpRequestError');

async function proxyService(ctx) {
  ctx.log.debug('ROUTE: %s', ctx.path);

  const {
    serviceUrl: url, method, headers, req: data,
  } = ctx;

  const options = {
    url,
    method,
    headers,
    data,
  };

  const res = await proxy(options).catch((e) => {
    if (!(e instanceof HttpRequestError)) throw e;
    ctx.throw(503);
  });

  const { status: resStatus, headers: resHeaders, data: resData } = res;

  ctx.status = resStatus;
  ctx.body = resData;
  ctx.set(resHeaders);
}

module.exports = { proxyService };
