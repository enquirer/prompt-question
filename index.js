'use strict';

var Choices = require('enquirer-choices');
var utils = require('./lib/utils');

/**
 * Create a new Question
 */

function Question(name, message, options) {
  if (utils.isObject(name) && name.isQuestion) {
    return name;
  }
  this.isQuestion = true;
  this.type = 'input';
  assign(this, {name, message, options});
}

Question.prototype.clone = function() {
  var cached = utils.clone(this.cache);
  return new this.constructor(cached);
};

Question.prototype.addChoices = function(choices, answers) {
  this.choices = new Choices(choices, answers);
  return this;
};

function assign(obj, options) {
  options = options || {};
  var cache = {};
  for (var key in options) {
    var val = options[key];
    if (utils.isObject(val)) {
      utils.extend(cache, val);
    } else if (typeof val !== 'undefined') {
      cache[key] = val;
    }
  }
  cache.message = cache.message || cache.name;
  cache.options = cache.options || {};
  utils.extend(obj, cache);
  utils.define(obj, 'cache', cache);
}

/**
 * Expose `Question`
 */

module.exports = Question;
