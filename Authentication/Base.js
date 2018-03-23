'use strict';

class Base {
  callback() {
    state.callback()(null, this.IAMPolicy(...arguments));
  }

  IAMPolicy(principalId, effect, resource, context) {
    return {
      principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        }, ],
      },
      context,
    };
  }

  getAuthorizationToken() {
    const event = state.event();

    if (!event.authorizationToken) {
      return false;
    }

    const token = event.authorizationToken.split(' ');

    if (token.length === 2) {
      return token[1];
    }

    return token[0];
  }

  deny(user) {
    this.callback(user, 'Deny', state.event().methodArn, {});
  }

  approve(authString, user) {
    this.callback(authString, 'Allow', state.event().methodArn.split('/').slice(0, 2).join('/') + '/*', {
      user
    });
  }
}

module.exports = Base;