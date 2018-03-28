const test = require('japa')
const path = require('path')
const chai = require('chai')
const expect = chai.expect

const Controller = require('../../src/Controller');

test.group('Controller', (group) => {
  test('should be an object.', (assert) => {
    assert.equal(typeof Controller, 'function');
  })
})