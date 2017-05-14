'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('clone-deep', 'clone');
require('define-property', 'define');
require('extend-shallow', 'extend');
require('kind-of', 'typeOf');
require = fn;

/**
 * Extend the given `obj` with `options`
 */

utils.assign = function(obj, options) {
  var cache = {};
  for (var key in options) {
    var val = options[key];
    if (key === 'radio') {
      obj.options.radio = val;
    } else if (utils.isObject(val)) {
      utils.extend(cache, val);
    } else if (typeof val !== 'undefined') {
      cache[key] = val;
    }
  }

  if (cache.radio === true) {
    obj.options.radio = true;
    delete cache.radio;
  }

  cache.message = cache.message || cache.name;
  utils.extend(obj, cache);
  utils.define(obj, 'cache', cache);
};

/**
 * Return true if `val` is an object
 */

utils.isObject = function(val) {
  return utils.typeOf(val) === 'object';
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
