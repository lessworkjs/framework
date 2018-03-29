const test = require('japa')
const path = require('path')

const Basic = require('../../src/Authentication/Basic');
const Jwt = require('../../src/Authentication/Jwt');
const State = require('../../src/State');
const state = new State();
state.set({
  authorizationToken: 'Bearer test'
}, {}, () => {})

global.State = state;

test.group('Auth', (group) => {
  test('should work', (assert) => {

    const basic = new Basic();
    const jwt = new Jwt();

    basic.auth('test', 'test')

    jwt.auth('test')

  })
})