var Question = require('./');

var question = new Question('foo', {
  choices: ['a', 'b', 'c']
});

question.toggleChoices(1)

console.log(question.choices);
