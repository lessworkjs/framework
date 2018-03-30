const test = require('japa')
const path = require('path')

test.group('Functions', (group) => {
  test('should work', (assert) => {
    const functions = require('../../lib/functions')(path.join(__dirname));

  })
})