class BadTokenError extends Error {
  constructor(message = 'Bad token') {
    super(message);
    this.name = 'BadTokenError';
    this.status = 400;
  }
}

module.exports = {
  BadTokenError,
};
