const test = require('japa')
const path = require('path')

test.group('Env', (group) => {
  test('should env()', (assert) => {
    require('../../lib/env');
    env();
    env('APP_ENV');
    env('A', 'B');
  })

  test('should Env()', (assert) => {
    const Env = require('../../src/Env');
    const env = new Env(__dirname);
    env.getEnvPath();
    env.get('APP_ENV', 'test');
    env.set('APP_ENV', 'test');
    env.load(env.getEnvPath(), true)

    process.env.NODE_ENV = 'testing';
    const _env = new Env(__dirname);

    process.env.ENV_PATH = path.join(__dirname, 'user');

    env.getEnvPath();
    delete process.env.ENV_PATH
  })

})