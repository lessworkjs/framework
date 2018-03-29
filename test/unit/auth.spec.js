const test = require('japa')
const path = require('path')

const Basic = require('../../src/Authentication/Basic');
const Jwt = require('../../src/Authentication/Jwt');
const State = require('../../src/State');

test.group('Auth', (group) => {
  test('should work', (assert) => {
    const state = new State();
    state.set([{
      authorizationToken: 'Basic dGVzdDp0ZXN0',
      methodArn: 'somethin'
    }, {}, () => {}])
    global.State = state;

    const basic = new Basic();
    const jwt = new Jwt();

    basic.auth('test', 'test')
    basic.auth('test', 'test999')

    jwt.auth('test')

    state.set([{
      authorizationToken: null,
      methodArn: 'somethin'
    }, {}, () => {}])

    jwt.auth('test')

  })
})