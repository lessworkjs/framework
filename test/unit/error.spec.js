const test = require('japa')
const path = require('path')

test.group('Error Lib', (group) => {
  test('should work', (assert) => {
    require('../../lib/error')('yup');
  })

})