/**
 * Authentication Basic Class
 *
 * @class Basic
 */
class Basic extends require('./Base') {
  auth(user, pass) {
    const authString = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;

    if (typeof State.event('authorizationToken') === 'undefined' || State.event('authorizationToken') !== authString) {
      return this.deny(user);
    }

    return this.approve(user, user);
  }
}

module.exports = Basic;