const test = require('japa')
const path = require('path')

require('../../lib/env')

const Lintl = require('../../src/Lintl');
const App = require('../../src/App');
const Helpers = require('../../src/Helpers')

test.group('Lintl', (group) => {
  test('shoud..', (assert) => {
    const help = new Helpers(__dirname);
    const app = new App();
    app.setLocale('en-US');

    const lintl = new Lintl(app, help, 'en-US')

    lintl._dateFormat(new Date())
    lintl._numberFormat('1,000')
    lintl._translate('message.hello')

    lintl._numberFormat('1,000', 'en-US', {
      style: 'currency',
      currency: 'JPY'
    }, false)

    lintl._translate('message.hello', 'en-US', {}, false)

  })
})