// Test the game functions
var assert = require('assert');
var game = require('../javascript/game.js');

// Test whether player's selection of human v. human, human v. computer, or computer v. computer is accurately recorded.
describe('game.determineGameType()', function(){
  var tests = [
    { args: [9], expected: gameType = "human-human"},
    {args: [10], expected: gameType = "comp-comp"},
    {args: [11], expected: gameType = "human-comp"},
    {args: [45], expected: console.log("Please enter 9, 10 or 11.")}
  ]

  tests.forEach(function(test) {
    it ('correctly returns gameType of ' + test.expected + ' given ' + test.args, function(){
      var res = game.determineGameType.apply(null, test.args);
      assert.equal(res, test.expected)
    })
   })
})

// For human v. human games, test whether player marker assignment works as expected
describe('game.assignPlayerMarker()', function(){
  // var tests = [
  //   {args: }
  // ]
})
