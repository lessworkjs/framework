const test = require('japa')
const path = require('path')

test.group('Env Lib', (group) => {
  test('should work', (assert) => {
    require('../../lib/env');
    env();
    env('APP_ENV');
    env('A', 'B');
  })

})