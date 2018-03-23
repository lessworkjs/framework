'use strict';

class <%= name %>Controller extends require('lesswork-framework/Controller') {
  get() {
    response.success({
      hello: 'world'
    });
  }
}

module.exports = <%= name %>Controller;