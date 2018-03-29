const test = require('japa')
const path = require('path')
const chai = require('chai')
const expect = chai.expect

const Exception = require('../../src/Exception');

test.group('Exception', (group) => {
  test('should show RuntimeException malformedJSON', (assert) => {
    const exception = Exception.RuntimeException.malformedJSON().toString();

    assert.equal(exception, 'RuntimeException: E_MALFORMED_JSON: The payload is not a json object');
  })

  test('should show RuntimeException fileDeleted', (assert) => {
    const exception = Exception.RuntimeException.fileDeleted().toString();

    assert.equal(exception, 'RuntimeException: E_FILE_DELETED: The file has already been deleted');
  })

  test('should show RuntimeException missingAppKey', (assert) => {
    const exception = Exception.RuntimeException.missingAppKey().toString();

    assert.equal(exception, 'RuntimeException: E_MISSING_APPKEY: undefined');
  })

  test('should show InvalidArgumentException invalidParameter', (assert) => {
    const exception = Exception.InvalidArgumentException.invalidParameter().toString();

    assert.equal(exception, 'InvalidArgumentException: E_INVALID_PARAMETER: undefined');
  })

  test('should show InvalidArgumentException missingParameter', (assert) => {
    const exception = Exception.InvalidArgumentException.missingParameter().toString();

    assert.equal(exception, 'InvalidArgumentException: E_MISSING_PARAMETER: undefined');
  })

  test('should show InvalidArgumentException invalidParameter', (assert) => {
    const exception = Exception.InvalidArgumentException.invalidParameter().toString();

    assert.equal(exception, 'InvalidArgumentException: E_INVALID_PARAMETER: undefined');
  })
})