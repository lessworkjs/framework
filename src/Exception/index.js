'use strict'

const NE = require('node-exceptions')

/**
 * RuntimeException Class
 * 
 * @class RuntimeException
 */
class RuntimeException extends NE.RuntimeException {

  /**
   * default error code to be used for raising
   * exceptions
   *
   * @return {Number}
   */
  static get defaultErrorCode() {
    return 500
  }

  /**
   * this exception is raised when expected value is
   * not a valid json object.
   *
   * @param  {Number} [code=500]
   *
   * @return {Object}
   */
  static malformedJSON(code) {
    return new this('The payload is not a json object', code || this.defaultErrorCode, 'E_MALFORMED_JSON')
  }

  /**
   * this exception is raised when an operation is attempted
   * on a file that has been deleted
   *
   * @param  {Number} [code=500]
   *
   * @return {Object}
   */
  static fileDeleted(code) {
    return new this('The file has already been deleted', code || this.defaultErrorCode, 'E_FILE_DELETED')
  }

  /**
   * this exception is raised when app key is missing
   * inside config/app.js file.
   *
   * @param  {String} message
   * @param  {Number} [code=500]
   *
   * @return {Object}
   */
  static missingAppKey(message, code) {
    return new this(message, code || this.defaultErrorCode, 'E_MISSING_APPKEY')
  }

  /**
   * this exception is raised when a named middleware is used
   * but not registered
   *
   * @param  {String} name
   * @param  {Number} [code=500]
   *
   * @return {Object}
   */
  static missingNamedMiddleware(name, code) {
    return new this(`${name} is not registered as a named middleware`, code || this.defaultErrorCode, 'E_MISSING_NAMED_MIDDLEWARE')
  }

}

class InvalidArgumentException extends NE.InvalidArgumentException {

  /**
   * default error code to be used for raising
   * exceptions
   *
   * @return {Number}
   */
  static get defaultErrorCode() {
    return 500
  }

  /**
   * this exception is raised when a method parameter is
   * missing but expected to exist.
   *
   * @param  {String} message
   * @param  {Number} [code=500]
   *
   * @return {Object}
   */
  static missingParameter(message, code) {
    return new this(message, code || this.defaultErrorCode, 'E_MISSING_PARAMETER')
  }

  /**
   * this exception is raised when a method parameter value
   * is invalid.
   *
   * @param  {String} message
   * @param  {Number} [code=500]
   *
   * @return {Object}
   */
  static invalidParameter(message, code) {
    return new this(message, code || this.defaultErrorCode, 'E_INVALID_PARAMETER')
  }

  /**
   * this exception is raised when unable to find
   * an event with a given name
   *
   * @param  {String} event
   * @param  {String} name
   * @param  {Number} [code=500]
   *
   * @return {Object}
   */
  static missingEvent(event, name, code) {
    return new this(`Cannot find an event with ${name} name for ${event} event`, code || this.defaultErrorCode, 'E_MISSING_NAMED_EVENT')
  }

}

module.exports = {
  RuntimeException,
  InvalidArgumentException,
  HttpException: NE.HttpException
}