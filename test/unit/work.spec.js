const test = require('japa')
const path = require('path')
const chai = require('chai')
const expect = chai.expect

const Work = require('../../src/Work');

test.group('Work', (group) => {
  test('should not fail ', (assert) => {
    const work = Work({
      commands: {
        test: path.join(__dirname, 'app/Commands/testCommand')
      }
    }, true);

    assert.equal(typeof work, 'object');
  })
})