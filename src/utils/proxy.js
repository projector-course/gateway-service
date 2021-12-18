const axios = require('axios');
const { HttpRequestError, REQUEST_ERROR_TYPE } = require('../errors/httpRequestError');

const { NETWORK_ERROR } = REQUEST_ERROR_TYPE;

function proxy(options) {
  return axios({ ...options, responseType: 'stream' })
    .catch((e) => {
      const { response, request } = e;
      if (response) {
        const { status } = response;
        if (status === 401) throw new Error('Bad service key');
        return response;
      }
      if (request) throw new HttpRequestError(NETWORK_ERROR, 'Service Unavailable', 503);
      throw e;
    });
}

module.exports = { proxy };
