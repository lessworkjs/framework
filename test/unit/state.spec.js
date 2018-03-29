const test = require('japa')
const path = require('path')

require('../../lib/env')

const State = require('../../src/State');

test.group('State', (group) => {
  test('shoud..', (assert) => {
    const state = new State()
    state.set([{}, {}, () => {}])
    state.context();
    state.event();
  })
})