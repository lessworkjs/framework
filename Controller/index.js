'use strict';

class Controller {
  constructor(state) {
    this.setState(state);
    this.setKernel();
    this.loadKernel();
  }

  setKernel() {

  }

  loadKernel() {
    this.kernel(() => {
      this.onKernelLoad();
    });
  }

  onKernelLoad() {
    this.construct();

    this.handle();
  }

  setState(state) {
    this.state = state;
  }

  construct() {

  }
}

module.exports = Controller;