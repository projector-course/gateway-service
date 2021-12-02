const axios = require('axios');
const { HttpRequestError, REQUEST_ERROR_TYPE } = require('../errors/httpRequestError');

function proxy(options) {
  return axios({ ...options, responseType: 'stream' })
    .catch((e) => {
      const { response, request, message } = e;
      if (response) return response;
      if (request) throw new HttpRequestError(REQUEST_ERROR_TYPE.NETWORK_ERROR, message);
      throw e;
    });
}

module.exports = { proxy };
