'use strict';

var Choices = require('prompt-choices');
var utils = require('./lib/utils');

/**
 * Create a new question with the given `name`, `message` and `options`.
 *
 * ```js
 * var question = new Question('first', 'What is your first name?');
 * console.log(question);
 * // Question {
 * //   type: 'input',
 * //   name: 'color',
 * //   message: 'What is your favorite color?'
 * // }
 * ```
 * @param {String|Object} `name` Question name or options.
 * @param {String|Object} `message` Question message or options.
 * @param {String|Object} `options` Question options.
 * @api public
 */

function Question(name, message, options) {
  if (arguments.length === 0) {
    throw new TypeError('expected a string or object');
  }

  if (utils.isObject(name) && name.isQuestion) {
    return name;
  }

  this.type = 'input';
  utils.define(this, 'isQuestion', true);
  utils.assign(this, {
    name: name,
    message: message,
    options: options
  });
}

/**
 * Clone the question instance.
 *
 * ```js
 * var clonedQuestion = question.clone();
 * ```
 * @return {Object} Returns the cloned question
 * @api public
 */

Question.prototype.clone = function() {
  var cached = utils.clone(this.cache);
  return new this.constructor(cached);
};

/**
 * Add formatted choice objects to the `question.choices` array.
 * See [prompt-choices][] for more details.
 *
 * ```js
 * question.addChoices(['foo', 'bar', 'baz']);
 * ```
 * @param {String|Array} `choices` One or more choices to add.
 * @return {Object} Returns the question instance for chaining
 * @api public
 */

Question.prototype.addChoices = function(choices) {
  this.choices = new Choices(choices, this.answers);
  return this;
};

/**
 * Toggle the `checked` value of the the choice at the given `idx`.
 *
 * ```js
 * question.toggleChoice(1);
 * ```
 * @param {Number} `idx` The index of the choice to toggle.
 * @return {Object} Returns the question instance for chaining
 * @api public
 */

Question.prototype.toggleChoice = function(idx) {
  if (typeof this.choices.toggleChoice === 'function') {
    this.choices.toggleChoice(idx);
  }
  return this;
};

/**
 * Enable the choice at the given `idx` and disable all other choices.
 *
 * ```js
 * question.toggleChoices(3);
 * ```
 * @param {Number} `idx`
 * @return {Object} Returns the question instance for chaining
 * @api public
 */

Question.prototype.toggleChoices = function(idx) {
  if (typeof this.choices.toggleChoices === 'function') {
    this.choices.toggleChoices(idx);
  }
  return this;
};

/**
 * Returns the given `val` or `question.default` if `val` is undefined or null.
 *
 * ```js
 * var question = new Question({name: 'first', message: 'First name'?, default: 'Bob'});
 * console.log(question.getAnswer());
 * //=> 'Bob'
 * console.log(question.getAnswer('Joe'));
 * //=> 'Joe'
 * console.log(question.getAnswer(false));
 * //=> false
 * console.log(question.getAnswer(0));
 * //=> 0
 * ```
 *
 * @param {any} `val`
 * @return {any}
 * @api public
 */

Question.prototype.getAnswer = function(val) {
  return (val != null && !!String(val)) ? val : (this.default || '');
};

/**
 * Getter that returns true if a `default` value has been defined.
 *
 * @name .hasDefault
 * @return {Boolean} True if a default value is defined.
 * @api public
 */

Object.defineProperty(Question.prototype, 'hasDefault', {
  get: function() {
    return this.default != null && !!String(this.default);
  }
});

/**
 * Expose `Question`
 */

module.exports = Question;
