const test = require('japa')
const path = require('path')

require('../../lib/env')

test.group('ErrorTransformer', (group) => {
  test('shoud set, get, and check locale', (assert) => {
    const ErrorTransformer = require('../../src/Transformers/ErrorTransformer');

    ErrorTransformer.transform({
      error: 'error',
      message: 'error',
      status: 500
    })

  })

})