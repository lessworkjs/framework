/**
 * WIP
 */

const Macroable = require('macroable');
const Intl = require('intl');
const IntlMessageFormat = require('intl-messageformat');
const path = require('path');
const _ = require('lodash');

/**
 * Lintl Class
 *
 * @alias Lintl
 * @namespace Lesswork/Src/Lintl
 * @group Core
 *
 * @class Lintl
 */
class Lintl extends Macroable {
  constructor(App, Helpers, fallback) {
    super();

    this.app = App;
    this.helpers = Helpers;
    this.fallback = fallback;

    this.translate = this._translate.bind(this);
    this.numberFormat = this._numberFormat.bind(this);
    this.dateFormat = this._dateFormat.bind(this);
  }

  _dateFormat(date, locale, fallback = true) {
    locale = locale || this.app.getLocale();

    if (fallback) {
      fallback = this.fallback;
    }

    if (!locale) {
      return date;
    }

    return new Intl.DateTimeFormat(_.without([locale, fallback], null)).format(date);
  }

  _numberFormat(...args) {
    const number = args[0];
    let locale = this.app.getLocale();
    let fallback = true;
    let format = false;

    args.slice(1).forEach((_arg) => {
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

    if (fallback) {
      fallback = this.fallback;
    }

    if (!locale) {
      return number;
    }

    return new Intl
      .NumberFormat(_.without([locale, fallback || null], null), format)
      .format(number);
  }

  _translate(...args) {
    let hash = args[0];
    let locale = null;
    let fallback = true;
    let format = null;

    args.slice(1).forEach((_arg) => {
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

    const locales = [locale || this.app.getLocale()];

    if (!locales.length) {
      return hash;
    }

    const _hash = hash;
    hash = hash.split('.');

    const file = hash[0];
    if (fallback && this.fallback !== locales[0]) {
      locales.push(this.fallback);
    }

    let line = null;

    for (const locale of locales) {
      try {
        const config = this.helpers.requireIfExists(path.join(this.helpers.resourcesPath(path.join('lang', locale)), `${file}.js`));
        if (!config) {
          continue;
        }
      } catch (error) {
        continue;
      }

      try {
        line = new IntlMessageFormat(hash.slice(1).reduce((o, i) => o[i], config), locale)
          .format(format);

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

module.exports = Lintl;