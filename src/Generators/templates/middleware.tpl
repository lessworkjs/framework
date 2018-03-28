'use strict';

class <%= name %> {
  * handle(request, response, next) {
    yield next;
  }
}

module.exports = <%= name %>;