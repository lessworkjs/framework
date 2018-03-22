'use strict';
const path = require('path');

class Controller {
  constructor(state) {
    this.setState(state);
  }

  loadKernel(appPath) {
    this.appPath = appPath;

    this.kernel = require(path.join(this.appPath, '/kernel'));

    this.kernel(() => {
      this.onKernelLoad();
    });
  }

  onKernelLoad() {
    this.construct();

    use('State').set(this.state);

    use('App').setPath(this.appPath);

    this.handle();
  }

  setState(state) {
    this.state = state;
  }

  construct() {

  }
}

module.exports = Controller;