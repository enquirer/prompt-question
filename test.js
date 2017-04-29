'use strict';

require('mocha');
var assert = require('assert');
var Question = require('./');
var question;

describe('prompt-question', function() {
  describe('Question constructor', function() {
    it('should export a function', function() {
      assert.equal(typeof Question, 'function');
    });

    it('should throw an error when invalid args are passed', function() {
      assert.throws(function() {
        question = new Question();
      });
    });

    it('should create a new question from `name`', function() {
      question = new Question('color');
      assert.deepEqual(question, {
        type: 'input',
        name: 'color',
        message: 'color',
        options: {}
      });
    });

    it('should create a new question from `name` and `message`', function() {
      question = new Question('color', 'Favorite color?');
      assert.deepEqual(question, {
        type: 'input',
        name: 'color',
        message: 'Favorite color?',
        options: {}
      });
    });

    it('should create a new question from `name`, `message` and `options`', function() {
      question = new Question('color', 'Favorite color?', {default: 'blue'});
      assert.deepEqual(question, {
        type: 'input',
        name: 'color',
        message: 'Favorite color?',
        default: 'blue',
        options: {}
      });
    });

    it('should add normalized choices to `items` when passed to the constructor', function() {
      question = new Question('color', 'Favorite color?', {
        default: 'blue',
        choices: ['foo', 'bar', 'baz']
      });

      assert.deepEqual(question.choices.items, [{
        name: 'foo',
        short: 'foo',
        value: 'foo',
        checked: false
      }, {
        name: 'bar',
        short: 'bar',
        value: 'bar',
        checked: false
      }, {
        name: 'baz',
        short: 'baz',
        value: 'baz',
        checked: false
      }]);
    });

    it('should add normalized choices when set directly on `choices`', function() {
      question = new Question('color', 'Favorite color?', {
        default: 'blue'
      });

      question.choices = ['foo', 'bar', 'baz'];

      assert.deepEqual(question.choices.items, [{
        name: 'foo',
        short: 'foo',
        value: 'foo',
        checked: false
      }, {
        name: 'bar',
        short: 'bar',
        value: 'bar',
        checked: false
      }, {
        name: 'baz',
        short: 'baz',
        value: 'baz',
        checked: false
      }]);
    });
  });

  describe('.hasDefault', function() {
    function quest(val) {
      return new Question('color', 'Favorite color?', {default: val});
    }

    it('should return true if a question has a default value', function() {
      assert.equal(quest(true).hasDefault, true);
      assert.equal(quest(false).hasDefault, true);
      assert.equal(quest(1).hasDefault, true);
      assert.equal(quest(0).hasDefault, true);
      assert.equal(quest('').hasDefault, true);
      assert.equal(quest('blue').hasDefault, true);
    });

    it('should return false if a question does not have a default value', function() {
      assert.equal(quest(null).hasDefault, false);
      assert.equal(quest(undefined).hasDefault, false);
      assert.equal(quest().hasDefault, false);
    });
  });

  describe('.getAnswer', function() {
    function quest() {
      return new Question('color', 'Favorite color?', {default: 'blue'});
    }

    it('should return the default when answer is undefined', function() {
      assert.equal(quest().getAnswer(), 'blue');
    });

    it('should return the default when answer is null', function() {
      assert.equal(quest().getAnswer(null), 'blue');
    });

    it('should return the answer when defined', function() {
      assert.equal(quest().getAnswer('foo'), 'foo');
    });

    it('should return a string answer', function() {
      assert.equal(quest().getAnswer('foo'), 'foo');
    });

    it('should return a numerical answer', function() {
      assert.equal(quest().getAnswer(0), 0);
    });
  });
});
