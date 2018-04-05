const MiddlewareBase = require('@adonisjs/middleware-base');

class Middleware {
  constructor(callback, config) {
    this.middleware = new MiddlewareBase('handle');

    let routeMiddlewares = [];

    if (config.middleware) {
      routeMiddlewares = typeof config.middleware === 'object' ? config.middleware : [config.middleware];
    }

    const kernel = require(Helpers.appRoot('app/Http/kernel'));

    this.middleware.registerGlobal(kernel.globalMiddleware);
    this.middleware.registerNamed(kernel.namedMiddleware);

    this.middleware
      .composeGlobalAndNamed(routeMiddlewares)
      .params([Request])
      .run()
      .then(() => {
        const results = this.run(callback);

        // TO-DO: collect.js
        if (!results) {
          return;
        }

        Response.success(results);
      })
      .catch((error) => {
        require('../../lib/error')(error);

        Response.error(use('ErrorTransformer').transform(error), error.status);
      });
  }

  run(callback) {
    if (typeof callback === 'string') {
      return Helpers.requireByName(callback);
    }

    return callback();
  }
}

module.exports = Middleware;