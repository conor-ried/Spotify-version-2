class BadRequestError extends Error {
    constructor(message = "Bad Request", status = 400) {
      super(message);
      this.status = status;
    }
  }
  
  class NotFoundError extends Error {
    constructor(message = "Not Found", status = 404) {
      super(message);
      this.status = status;
    }
  }
  class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized') {
      super(message);
      this.name = 'UnauthorizedError';
      this.status = 401;
    }
  }
  class ForbiddenError extends Error {
    constructor(message = 'Forbidden') {
      super(message);
      this.name = 'ForbiddenError';
      this.status = 403;
    }
  }
  module.exports = { BadRequestError, NotFoundError,
    UnauthorizedError,
  ForbiddenError, };