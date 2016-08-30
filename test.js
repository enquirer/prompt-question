'use strict';

require('mocha');
var util = require('util');
var assert = require('assert');
var Question = require('./');

describe('enquirer-question', function() {
  it('should export a function', function() {
    assert.equal(typeof Question, 'function');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      new Question();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected a string or object');
      cb();
    }
  });

  it('should create a new question from `name`', function() {
    var question = new Question('color');
    assert.deepEqual(question, { type: 'input', name: 'color', message: 'color' });
  });

  it('should create a new question from `name` and `message`', function() {
    var question = new Question('color', 'Favorite color?');
    assert.deepEqual(question, { type: 'input', name: 'color', message: 'Favorite color?' });
  });

  it('should create a new question from `name`, `message` and `options`', function() {
    var question = new Question('color', 'Favorite color?', {default: 'blue'});
    assert.deepEqual(question, {
      type: 'input',
      name: 'color',
      message: 'Favorite color?',
      default: 'blue'
    });
  });

  it('should add normalized choices when passed to the constructor', function() {
    var question = new Question('color', 'Favorite color?', {
      default: 'blue',
      choices: ['foo', 'bar', 'baz']
    });

    assert.deepEqual(question.choices, {
      original: ['foo', 'bar', 'baz'],
      keys: ['foo', 'bar', 'baz'],
      items: [
        {
          disabled: false,
          checked: false,
          name: 'foo',
          value: 'foo',
          short: 'foo'
        },
        {
          disabled: false,
          checked: false,
          name: 'bar',
          value: 'bar',
          short: 'bar'
        },
        {
          disabled: false,
          checked: false,
          name: 'baz',
          value: 'baz',
          short: 'baz'
        }
      ],
      keymap: {
        foo: {
           disabled: false,
           checked: false,
           name: 'foo',
           value: 'foo',
           short: 'foo'
        },
        bar: {
           disabled: false,
           checked: false,
           name: 'bar',
           value: 'bar',
           short: 'bar'
        },
        baz: {
           disabled: false,
           checked: false,
           name: 'baz',
           value: 'baz',
           short: 'baz'
        }
      }
    });
  });

  it('should add normalized choices when set directly on `choices`', function() {
    var question = new Question('color', 'Favorite color?', {
      default: 'blue'
    });

    question.choices = ['foo', 'bar', 'baz'];

    assert.deepEqual(question.choices, {
      original: ['foo', 'bar', 'baz'],
      keys: ['foo', 'bar', 'baz'],
      items: [
        {
          disabled: false,
          checked: false,
          name: 'foo',
          value: 'foo',
          short: 'foo'
        },
        {
          disabled: false,
          checked: false,
          name: 'bar',
          value: 'bar',
          short: 'bar'
        },
        {
          disabled: false,
          checked: false,
          name: 'baz',
          value: 'baz',
          short: 'baz'
        }
      ],
      keymap: {
        foo: {
           disabled: false,
           checked: false,
           name: 'foo',
           value: 'foo',
           short: 'foo'
        },
        bar: {
           disabled: false,
           checked: false,
           name: 'bar',
           value: 'bar',
           short: 'bar'
        },
        baz: {
           disabled: false,
           checked: false,
           name: 'baz',
           value: 'baz',
           short: 'baz'
        }
      }
    });
  });
});
