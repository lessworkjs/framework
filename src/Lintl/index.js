'use strict';

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
 * @binding Lesswork/Lintl
 * @group Core
 *
 * @class Lintl
 */
class Lintl extends Macroable {
  constructor(fallback) {
    super();

    this.fallback = fallback;

    this.translate = this._translate.bind(this);
    this.numberFormat = this._numberFormat.bind(this);
    this.dateFormat = this._dateFormat.bind(this);
  }

  _dateFormat(date, locale, fallback = true) {
    locale = locale || App.getLocale();

    if (fallback) {
      fallback = this.fallback;
    }

    if (!locale) {
      return date;
    }

    return new Intl.DateTimeFormat(_.without([locale, fallback], null)).format(date);
  }

  _numberFormat(...args) {
    let number = args[0];
    let locale = App.getLocale();
    let fallback = true;
    let format = false;

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

    if (fallback) {
      fallback = this.fallback;
    }

    if (!locale) {
      return number;
    }

    return new Intl.NumberFormat(_.without([locale, fallback], null), format).format(number);
  }

  _translate(...args) {
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

    const locales = [locale || App.getLocale()];

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

module.exports = Lintl;