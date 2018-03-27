'use strict';

const Macroable = require('macroable');
const Intl = require('intl');
const IntlMessageFormat = require('intl-messageformat');
const path = require('path');

class Translation extends Macroable {
  constructor(fallback) {
    super();

    this.fallback = fallback;

    this.translate = this._translate.bind(this);
  }

  _translate(...args) {
    console.log(args);

    let hash = args[0];
    let locale = null;
    let fallback = true;
    let format = null;

    args.slice(1).forEach(function (_arg) {
      if (typeof _arg === 'string') {
        locale = _arg;
      }

      if (typeof _arg === 'object') {
        format = _arg;
      }

      if (typeof _arg === 'boolean') {
        fallback = _arg;
      }
    });

    const locales = [locale || use('App').getLocale()];

    if (!locales.length) {
      return hash;
    }

    const _hash = hash;
    hash = hash.split('.');

    const file = hash[0];
    if (fallback) {
      locales.push(this.fallback);
    }

    let line = null;

    for (let locale of locales) {
      const config = Helpers.requireIfExists(path.join(Helpers.resourcesPath(path.join('lang', locale)), `${file}.js`));

      if (!config) {
        continue;
      }

      try {
        line = new IntlMessageFormat(hash.slice(1).reduce((o, i) => o[i], config), locale).format(format);

        break;
      } catch (e) {
        continue;
      }
    }

    if (line) {
      return line;
    }

    return _hash;
  }
}

module.exports = Translation;