const test = require('japa')
const path = require('path')
const chai = require('chai')
const expect = chai.expect

const Exception = require('../../src/Exception');

test.group('Exception', (group) => {
  test('should show runtimeException malformedJSON', (assert) => {
    const exception = Exception.RuntimeException.malformedJSON().toString();

    assert.equal(exception, 'RuntimeException: E_MALFORMED_JSON: The payload is not a json object');
  })

  test('should show runtimeException fileDeleted', (assert) => {
    const exception = Exception.RuntimeException.fileDeleted().toString();

    assert.equal(exception, 'RuntimeException: E_FILE_DELETED: The file has already been deleted');
  })
})