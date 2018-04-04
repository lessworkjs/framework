class Globals {
  register() {
    global.App = use('App');
    global.Helpers = use('Helpers');
    global.Config = use('Config');
    global.config = function () {
      return use('Config').get(...arguments);
    };

    global.Env = use('Env');
    global.env = function () {
      return use('Env').get(...arguments);
    };

    global.Response = use('Response');
    global.response = function () {
      return Response.success(...arguments);
    };

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