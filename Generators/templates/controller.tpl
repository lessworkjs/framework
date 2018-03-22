'use strict';

class <%= name %> extends require('../BaseController') {
  handle() {
    const responseObject = {
      data: "Hello World!"
    };

    use('Response').success(null, responseObject, results => {
      return results.data;
    }, this.state.callback);
  }
}

module.exports.handle = function (event, context, callback) {
  new <%= name %>({
    event,
    context,
    callback
  });
};