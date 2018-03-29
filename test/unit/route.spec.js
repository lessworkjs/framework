const test = require('japa')
const path = require('path')

require('../../lib/env')

const Route = require('../../src/Route');

const slsState = [{}, {}, () => {}];

test.group('Route', (group) => {
  test('shoud work', (assert) => {

    new Route(slsState, __dirname).get('test', require('./app/Http/Controllers/HomeController')['index']);
    new Route(slsState, __dirname).post('test', require('./app/Http/Controllers/HomeController')['index']);
    new Route(slsState, __dirname).patch('test', require('./app/Http/Controllers/HomeController')['index']);
    new Route(slsState, __dirname).delete('test', require('./app/Http/Controllers/HomeController')['index']);
    new Route(slsState, __dirname).options('test', require('./app/Http/Controllers/HomeController')['index']);
    new Route(slsState, __dirname).connect('test', require('./app/Http/Controllers/HomeController')['index']);
    // new Route(slsState, __dirname).middleware('App/Http/Middleware/Global').auth('').get('test', require('./app/Http/Controllers/HomeController')['index']);

  })

})