'use strict';

class <%= name %>Controller extends require('lesswork-framework/Controller') {
  * get() {
    return {
      hello: 'world'
    };
  }
}

module.exports = <%= name %>Controller;