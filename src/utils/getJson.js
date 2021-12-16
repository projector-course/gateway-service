const { get } = require('axios');
const { HttpRequestError, REQUEST_ERROR_TYPE } = require('../errors/httpRequestError');

const { RESPONSE_ERROR, DATA_ERROR, NETWORK_ERROR } = REQUEST_ERROR_TYPE;

function getJson(url, options = {}) {
  return get(url, options)
    .then((res) => {
      const { headers, data } = res;
      const { 'content-type': contentType } = headers;
      if (!/^application\/json/.test(contentType)) {
        throw new HttpRequestError(RESPONSE_ERROR, 'Wron content-type');
      }
      if (typeof data === 'string') {
        throw new HttpRequestError(DATA_ERROR, 'Wron data format');
      }
      return data;
    })
    .catch((e) => {
      if (e instanceof HttpRequestError) throw e;
      const { response, request } = e;
      if (response) {
        const { status, statusText, data } = response;
        throw new HttpRequestError(RESPONSE_ERROR, data || statusText, status);
      } else if (request) {
        throw new HttpRequestError(NETWORK_ERROR, 'Service unavailable', 503);
      }
      throw e;
    });
}

module.exports = { getJson };
