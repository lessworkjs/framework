const test = require('japa')
const path = require('path')

require('../../lib/env')

const Request = require('../../src/Request');
const State = require('../../src/State');

const state = new State()
state.set([{}, {}, () => {}])

test.group('Request', (group) => {
  test('shoud..', (assert) => {

    const request = new Request(state)
    request.all()
    request.context()
    request.fetch()
    request.get()
    request.input()
    request.headers()
    request.method()

  })
})