function getService(ctx, next) {
  const { path, search } = ctx;
  const match = path.match(/^\/([^/]+)/) || {};
  const service = match[1];
  if (!service) ctx.throw(404);

  const { url } = ctx.services[service] || {};
  if (!url) ctx.throw(404);

  ctx.serviceUrl = `${url}${path}${search}`;

  return next();
}

module.exports = { getService };
