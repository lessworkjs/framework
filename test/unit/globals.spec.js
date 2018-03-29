const test = require('japa')
const path = require('path')

require('../../lib/env')

test.group('Globals', (group) => {
  test('should work', (assert) => {
    const Kernel = require('../../src/Kernel');

    new Kernel([{}, {}, () => {}], __dirname).handle(function () {
      global.config('APP_ENV')
      global.env('APP_ENV')

      global.response();
    });

  })
})