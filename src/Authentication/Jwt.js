const jwt = require('jsonwebtoken');

/**
 * Authentication JWT Class
 *
 * @class Jwt
 */
class Jwt extends require('./Base') {
  auth(secret) {
    const authString = this.getAuthorizationToken();

    if (!authString) {
      return this.deny(authString);
    }

    return jwt.verify(authString, secret, (error, decoded) => {
      if (error) {
        return this.deny(authString);
      }

      return this.approve(authString, JSON.stringify(decoded.user));
    });
  }
}

module.exports = Jwt;