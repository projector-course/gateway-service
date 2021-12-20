class ServiceKeyError extends Error {
  constructor(message = 'Bad service key') {
    super(message);
    this.name = 'ServiceKeyError';
    this.status = 401;
  }
}

module.exports = {
  ServiceKeyError,
};
