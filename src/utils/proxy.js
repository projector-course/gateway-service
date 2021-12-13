const axios = require('axios');
const { HttpRequestError, REQUEST_ERROR_TYPE } = require('../errors/httpRequestError');

function proxy(options) {
  return axios({ ...options, responseType: 'stream' })
    .catch((e) => {
      const { response, request } = e;
      if (response) return response;
      if (request) throw new HttpRequestError(REQUEST_ERROR_TYPE.NETWORK_ERROR, 503, 'Service Unavailable');
      throw e;
    });
}

module.exports = { proxy };
