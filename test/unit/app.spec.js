const test = require('japa')
const path = require('path')

const App = require('../../src/App');

test.group('App', (group) => {
  test('shoud set and get', (assert) => {
    const app = new App()

    app.setLocale('en-ES');
    assert.equal(app.getLocale(), 'en-ES');
    assert.equal(app.isLocale('en-ES'), true);
  })

  test('should read APP_ENV from environment()', (assert) => {
    const app = new App()

    process.env.APP_ENV = 'test';

    assert.equal(app.environment(), 'test');
    assert.equal(app.environment('test'), true);

  })

})