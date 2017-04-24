'use strict';

function ApiError(message, status) {
  this.name = 'ApiError';
  this.message = message || 'Default Message';
  this.status = status || 500;
  this.stack = (new Error()).stack;
}
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

module.exports = ApiError;
