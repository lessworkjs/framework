const test = require('japa')
const path = require('path')

test.group('Error', (group) => {
  test('should work', (assert) => {
    require('../../lib/error')('yup');
  })

})