'use strict';
/**
 * WIP
 * 
 * From https://github.com/adonisjs/adonis-framework/blob/3.0.13/src/Server/index.js
 * 
 */

class Run {
  constructor(callback, lastArg) {
    const helpers = require('./helpers');
    const Middleware = use('Middleware');

    const routeAction = function* (handler) {
      use('App').run(callback);
    };

    let routeMiddlewares = false;

    if (typeof lastArg === "object") {
      if (lastArg.middleware) {
        routeMiddlewares = typeof lastArg.middleware === "object" ? lastArg.middleware : [lastArg.middleware];
      }
    }

    const callRouteAction = function (resolvedRoute, request, response) {
      resolvedRoute.middlewares = routeMiddlewares;

      const chain = helpers.makeMiddlewareChain(Middleware, routeAction, false, resolvedRoute)
      return _executeChain(chain, request, response)
    };

    const finalHandler = function* (resolvedRoute, request, response) {
      yield callRouteAction(resolvedRoute, request, response)
    };

    const _respond = function (request, response, finalHandler) {
      try {
        const chain = helpers.makeMiddlewareChain(Middleware, finalHandler, true)
        return _executeChain(chain, request, response);
      } catch (error) {
        handleError(error);
      }
    };

    const handleError = function (error) {
      Response.error(use('ErrorTransformer').transform(error), error.status);
    }

    const _executeChain = function (chain, request, response) {
      const middleware = Middleware;
      return require('co')(function* () {
        yield middleware.compose(chain, request, response);
      }).catch((error) => {
        handleError(error);
      });
    };

    _respond(use('Request'), use('Response'), finalHandler);
  }
}

module.exports = Run;