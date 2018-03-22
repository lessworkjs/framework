'use strict';

class Controller {
  constructor(state) {
    this.setState(state);
    this.setKernel();
    this.loadKernel();
  }

  loadKernel() {
    this.kernel = require(this.kernel);

    this.kernel(() => {
      this.onKernelLoad();
    });
  }

  onKernelLoad() {
    this.construct();

    use('State').set(this.state);

    this.handle();
  }

  setState(state) {
    this.state = state;
  }

  construct() {

  }
}

module.exports = Controller;