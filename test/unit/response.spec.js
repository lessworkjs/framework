const test = require('japa')
const path = require('path')

require('../../lib/env')

const Response = require('../../src/Response');
const State = require('../../src/State');

const state = new State()
state.set([{}, {}, () => {}])

test.group('Response', (group) => {
  test('shoud..', (assert) => {

    const response = new Response(state)
    response.success()
    response.successOrError()
    response.error()

    response.success({}, () => {

    })
    response.success('ok')
    response.success('ok', 204)
    response.successOrError(null, 'ok', 204)
    response.successOrError(null, 'ok')
    response.successOrError('error')
    response.error('fail')

  })
})