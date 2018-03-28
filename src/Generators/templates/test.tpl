'use strict';

const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
const assert = mochaPlugin.chai.assert;

const Test = require('lesswork-framework/src/Test');

let wrapped = mochaPlugin.getWrapper('<%= name %>', '/routes/<%= name %>', 'get');

describe('<%= name %>', () => {
  before((done) => {
    done();
  });

  it('should work', () => {
    return wrapped.run().then((response) => {
      expect(response).to.not.be.empty;
      assert.equal(typeof response, 'object');
      assert.equal(response.statusCode, '200');

      const body = JSON.parse(response.body);
      assert.equal(body.hello, 'world');
    });
  });
});