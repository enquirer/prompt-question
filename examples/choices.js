var Question = require('..');
var question = new Question('color', 'What is your favorite color?', {
  choices: ['red', 'blue', 'yellow']
});
// question.toggleChoices(1);
console.log(question.choices);
