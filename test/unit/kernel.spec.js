const test = require('japa')
const path = require('path')

require('../../lib/env')

test.group('Env Lib', (group) => {
  test('should work', (assert, done) => {
    const kernel = require('../../lib/kernel')(__dirname)(() => {
      done();
    });

  })
})