'use strict';

const path = require('path');
const Macroable = require('macroable');

(new require('../App')).local();

process.env = Object.assign(process.env, require(path.resolve(process.cwd(), '.env.js'))());

class Test extends Macroable {
  constructor() {
    super();

    this.obj = {};
  }

  authed(id = 1) {
    this.obj.requestContext = this.obj.requestContext || {};
    this.obj.requestContext.authorizer = this.obj.requestContext.authorizer || {};
    this.obj.requestContext.authorizer.user = JSON.stringify({
      id
    });

    return this;
  }

  get_hashed(key = 'hash_id', value = 1) {
    return this.get(key, value, true);
  }

  get(key = 'id', value = 1, encode) {
    if (encode) {
      //value = hashids.encode(value);
    }

    this.obj.pathParameters = this.obj.pathParameters || {};
    this.obj.pathParameters[key] = value;

    return this;
  }

  body(obj) {
    this.obj.body = JSON.stringify(obj);

    return this;
  }

  data() {
    const results = this.obj;
    this.obj = {};
    return results;
  }

  render() {
    return this.obj;
  }
}

module.exports = new Test();