'use strict';

class Basic extends require('./Base') {
  auth(user, pass) {
    const authString = 'Basic ' + new Buffer(user + ':' + pass).toString('base64');

    if (typeof state.event('authorizationToken') == 'undefined' || state.event('authorizationToken') !== authString) {
      return this.deny(user);
    }

    this.approve(user, user);
  }
}

module.exports = Basic;