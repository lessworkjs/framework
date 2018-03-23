'use strict';

const {
  ServiceProvider
} = require('adonis-fold');

class <%= name %>Provider extends ServiceProvider {
  /**
   * Register method called by the Ioc container
   * to register the provider
   *
   * @method register
   *
   * @return {void}
   */
  * register() {
    
  }

  /**
    * The boot method called by Ioc container to
    * boot the providers
    *
    * @method boot
    *
    * @return {void}
    */
  * boot() {
      
  }
}

module.exports = <%= name %>Provider;