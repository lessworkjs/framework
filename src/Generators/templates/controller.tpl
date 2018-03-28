'use strict';

class <%= name %>Controller extends require('lesswork-framework/src/Controller') {
  * get() {
    return {
      hello: 'world'
    };
  }
}

module.exports = <%= name %>Controller;