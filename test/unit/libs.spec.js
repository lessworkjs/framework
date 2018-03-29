const test = require('japa')
const path = require('path')

const Test = require('../../src/Test');

test.group('Lib', (group) => {
  test('should set authed', (assert) => {
    Test.authed(1);
  })

  test('should get hashed', (assert) => {
    Test.get_hashed(1);
  })

  test('should get', (assert) => {
    Test.get(1);
  })

  test('should get body', (assert) => {
    Test.body();
  })

  test('should get data', (assert) => {
    Test.data(1);
  })

  test('should render', (assert) => {
    Test.render(1);
  })

})