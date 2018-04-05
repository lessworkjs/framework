class Globals {
  register(...args) {
    global.App = use('App');
    global.Helpers = use('Helpers');
    global.Config = use('Config');
    global.config = () => use('Config').get(...args);

    global.Env = use('Env');
    global.env = () => use('Env').get(...args);

    global.Response = use('Response');
    global.response = () => Response.success(...args);

    global.Request = use('Request');
    global.State = use('State');
    global.EXP = use('Exception');

    this.registerLintl();

    global.Event = use('Event');

    Event.fire('app:registerGlobals');
  }

  registerLintl() {
    global.Lintl = use('Lintl');

    global.numberFormat = Lintl.numberFormat;
    global.dateFormat = Lintl.dateFormat;
    global.__ = Lintl.translate;
    global.lang = global.__;

    App.setLocale(Config.get('app.locale'));
  }
}

module.exports = Globals;