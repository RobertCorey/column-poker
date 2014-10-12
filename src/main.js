var handEval = require('hoyle').Hand,
colors = require('colors'),
_ = require('lodash'),
prompt = require('prompt');

prompt.message = '';
prompt.start();

var Game = function () {
  this.printer = require('./printer');
  this.deck = _.shuffle(require('./deck'));
  this.round = 0;
};

Game.prototype.initialDeal = function () {
  var player1Hand = [];
  var player2Hand = [];

  for (var i = 0; i < 10; i++) {
    if (i < 5) {
      player1Hand.push([this.deck.shift()]);
    } else {
      player2Hand.push([this.deck.shift()]);
    }
  }
  this.p1Hand = player1Hand;
  this.p2Hand = player2Hand;
  this.activeCard = this.deck.shift();
};

Game.prototype.startGame = function () {
  console.log('Dealing first row of cards, Good Luck!');
  this.printGameState();
};

Game.prototype.mainLoop = function () {
  var current = (this.round % 2 === 0) ? '1' : '2';
  console.log('Round Number ' + this.round);
  this.printGameState();
  var promptMessage = 'Player ' + current + ' enter column number';
  prompt.get([promptMessage], function (err, input) {

  });  
};

Game.prototype.printGameState = function () {
  this.printer.printHands(this.p1Hand, 'Player 1 Hand:');
  this.printer.printHands(this.p2Hand, 'Player 2 Hand:');
  this.printer.printCard(this.activeCard);
};




var myGame = new Game();
myGame.initialDeal();
myGame.mainLoop();
// myGame.startGame();