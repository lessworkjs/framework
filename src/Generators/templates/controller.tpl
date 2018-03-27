'use strict';

class <%= name %>Controller extends require('lesswork-framework/Controller') {
  * get() {
    Response.success({
      hello: 'world'
    });
  }
}

module.exports = <%= name %>Controller;