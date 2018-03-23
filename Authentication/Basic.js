'use strict';

class Basic extends require('./Base') {
  auth(user, pass) {
    const event = state.event();

    const authString = 'Basic ' + new Buffer(user + ':' + pass).toString('base64');

    if (typeof event.authorizationToken == 'undefined' || event.authorizationToken != authString) {
      return this.deny(user);
    }

    this.approve(user, user);
  }
}

module.exports = Basic;