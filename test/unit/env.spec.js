'use strict'

/*
 * adonis-framework
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const test = require('japa')
const path = require('path')
const Env = require('../../src/Env')
const Helpers = require('../../src/Helpers')

test.group('Env', (group) => {
  group.beforeEach(() => {
    this.helpers = new Helpers(path.join(__dirname))
  })

  test('ignore error when file is ENV_SILENT is true', (assert) => {
    process.env.ENV_SILENT = true

    /* eslint-disable no-new */
    new Env(this.helpers._appRoot)
    delete process.env.ENV_SILENT
  })

  test('get value for a given key', (assert) => {
    process.env.ENV_PATH = './user/.env.js'
    const env = new Env(this.helpers._appRoot)
    assert.equal(env.get('HELLO'), 'WORLD')
    delete process.env.ENV_PATH
  })

  test('get default value when actual value is missing', (assert) => {
    process.env.ENV_PATH = './user/.env.js'
    const env = new Env(this.helpers._appRoot)
    assert.equal(env.get('FOO', 'BAR'), 'BAR')
    delete process.env.ENV_PATH
  })

  test('set value for a given key', (assert) => {
    process.env.ENV_PATH = './user/.env.js'
    const env = new Env(this.helpers._appRoot)
    env.set('FOO', 'BAZ')
    assert.equal(env.get('FOO', 'BAR'), 'BAZ')
    delete process.env.ENV_PATH
  })

  test('load new config file and overwrite existing file', (assert) => {
    process.env.ENV_PATH = './user/.env.js'
    const env = new Env(this.helpers._appRoot)
    env.load('./user/.env.override.js')
    assert.equal(process.env.HELLO, 'UNIVERSE')
    delete process.env.ENV_PATH
  })

  test('load .env.testing file when NODE_ENV is set to testing by default', (assert) => {
    process.env.NODE_ENV = 'testing'
    const files = []

    const _load = Env.prototype.load
    Env.prototype.load = (file) => (files.push(file))
    new Env(this.helpers._appRoot)
    assert.deepEqual(files, ['.env.js', '.env.testing.js'])
    Env.prototype.load = _load
    delete process.env.NODE_ENV
  })

  test('expand variables inside .env file', (assert) => {
    process.env.ENV_PATH = './user/.env.expand.js'
    const env = new Env(this.helpers._appRoot)
    assert.equal(env.get('URL'), 'http://127.0.0.1:3333')
    delete process.env.ENV_PATH
  })

  test('expand variables when overwrite is true', (assert) => {
    process.env.ENV_PATH = './user/.env.expand.js'
    process.env.URL = 'http://foo'
    const env = new Env(this.helpers._appRoot)
    assert.equal(env.get('URL'), 'http://foo')

    env.load(path.join(__dirname, './user/.env.expand.js'), true)
    assert.equal(env.get('URL'), 'http://127.0.0.1:3333')
    delete process.env.ENV_PATH
  })
})