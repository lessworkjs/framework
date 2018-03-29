'use strict'

/**
 * adonis-framework
 * Copyright(c) 2015-2016 Harminder Virk
 * MIT Licensed
 */

const test = require('japa')
const chai = require('chai')
const expect = chai.expect
const Ioc = require('adonis-fold').Ioc
const path = require('path')
const Middleware = require('../../src/Middleware')
require('co-mocha')

test.group('Middleware', (group) => {
  group.afterEach(function () {
    Middleware.new()
    Ioc.new()
    Ioc.autoload('App', path.join(__dirname, './app'))
  })

  test('should register a global middleware', function () {
    Middleware.register('App/Foo/Bar')
    const global = Middleware.getGlobal()
    expect(global[0]).to.equal('App/Foo/Bar')
  })

  test('should register a named middleware', function () {
    Middleware.register('bar', 'App/Foo/Bar')
    const named = Middleware.getNamed()
    expect(named.bar).to.equal('App/Foo/Bar')
  })

  test('should bulk register global middleware', function () {
    Middleware.global(['App/Foo/Bar', 'App/Foo/Baz'])
    const global = Middleware.getGlobal()
    expect(global).deep.equal(['App/Foo/Bar', 'App/Foo/Baz'])
  })

  test('should register only unique middleware to the global list', function () {
    Middleware.global(['App/Foo/Bar', 'App/Foo/Bar'])
    const global = Middleware.getGlobal()
    expect(global).have.length(1)
    expect(global[0]).to.equal('App/Foo/Bar')
  })

  test('should bulk register a named middleware', function () {
    const namedMiddleware = {
      'bar': 'App/Foo/Bar',
      'baz': 'App/Foo/Baz'
    }
    Middleware.named(namedMiddleware)
    const named = Middleware.getNamed()
    expect(named).deep.equal(namedMiddleware)
  })

  test('should fetch parameters from named middleware', function () {
    expect(Middleware.fetchParams('basic')).deep.equal(['basic'])
  })

  test('should fetch parameters from multiple named middleware', function () {
    expect(Middleware.fetchParams('basic,false')).deep.equal(['basic', 'false'])
  })

  test('should resolve all global middleware using resolve method', function () {
    Middleware.global(['App/Http/Middleware/Global'])
    const resolved = Middleware.resolve({}, true)
    expect(resolved).to.be.an('array')
    expect(resolved.length).to.equal(1)
    expect(resolved[0]).to.have.property('instance')
    expect(resolved[0]).to.have.property('method')
    expect(resolved[0]).to.have.property('parameters')
  })

  test('should format named middleware keys to namespace params mappings', function () {
    Middleware.register('auth', 'App/Http/Middleware/AuthMiddleware')
    const formatted = Middleware.formatNamedMiddleware(['auth:basic'])
    expect(formatted).to.deep.equal({
      'App/Http/Middleware/AuthMiddleware': ['basic']
    })
  })

  test('should throw error when unable to find mapping inside middleware store', function () {
    const formatted = function () {
      return Middleware.formatNamedMiddleware(['auth:basic'])
    }
    expect(formatted).to.throw('E_MISSING_NAMED_MIDDLEWARE: auth is not registered as a named middleware')
  })

  test('should resolve named middleware using resolve method', function () {
    Middleware.register('auth', 'App/Http/Middleware/AuthMiddleware')
    const formatted = Middleware.formatNamedMiddleware(['auth:basic'])
    const resolved = Middleware.resolve(formatted, false)
    expect(resolved.length).to.equal(1)
    expect(resolved[0]).to.have.property('instance')
    expect(resolved[0]).to.have.property('method')
    expect(resolved[0]).to.have.property('parameters')
    expect(resolved[0].parameters).deep.equal(['basic'])
  })

  test('should resolve global and named named middleware using resolve method', function () {
    Middleware.register('auth', 'App/Http/Middleware/AuthMiddleware')
    Middleware.global(['App/Http/Middleware/Global'])
    const formatted = Middleware.formatNamedMiddleware(['auth:basic'])
    const resolved = Middleware.resolve(formatted, true)
    expect(resolved.length).to.equal(2)
    expect(resolved[0]).to.have.property('instance')
    expect(resolved[0]).to.have.property('method')
    expect(resolved[0]).to.have.property('parameters')
    expect(resolved[0].parameters).deep.equal([])
    expect(resolved[1]).to.have.property('instance')
    expect(resolved[1]).to.have.property('method')
    expect(resolved[1]).to.have.property('parameters')
    expect(resolved[1].parameters).deep.equal(['basic'])
  })

  test('should compose global middleware using compose method', function* () {
    Middleware.global(['App/Http/Middleware/Global'])
    const request = {}
    const response = {}
    const resolved = Middleware.resolve([], true)
    const compose = Middleware.compose(resolved, request, response)
    yield compose()
    expect(request.count).to.equal(2)
  })

  test('should abort request in between when middleware throws an error', function* () {
    Middleware.global(['App/Http/Middleware/GlobalThrow', 'App/Http/Middleware/Parser'])
    const request = {}
    const response = {}
    const resolved = Middleware.resolve([], true)
    const compose = Middleware.compose(resolved, request, response)
    try {
      yield compose()
      expect(true).to.equal(false)
    } catch (e) {
      expect(e.message).to.equal('Login')
      expect(request.count).to.equal(undefined)
    }
  })

  test('should call middleware one by one', function* () {
    Middleware.global(['App/Http/Middleware/Parser', 'App/Http/Middleware/Cycle2'])
    const request = {}
    const response = {}
    const resolved = Middleware.resolve([], true)
    const compose = Middleware.compose(resolved, request, response)
    yield compose()
    expect(request.count).to.equal(1)
  })

  test('should pass parameters to the middleware', function* () {
    Middleware.global(['App/Http/Middleware/Parser', 'App/Http/Middleware/Cycle2'])
    Middleware.register('auth', 'App/Http/Middleware/AuthMiddleware')
    const request = {}
    const response = {}
    const formatted = Middleware.formatNamedMiddleware(['auth:basic'])
    const resolved = Middleware.resolve(formatted, true)
    const compose = Middleware.compose(resolved, request, response)
    yield compose()
    expect(request.count).to.equal(1)
    expect(request.scheme).to.equal('basic')
  })

  test('should be able to compose a closure attached to the middleware', function* () {
    const request = {}
    const response = {}
    const middleware = function* (request, response) {
      request.count = 1
      response.count = 1
    }
    const compose = Middleware.compose([middleware], request, response)
    yield compose()
    expect(request.count).to.equal(1)
    expect(response.count).to.equal(1)
  })
})