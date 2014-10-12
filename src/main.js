var colors = require('colors'),
_ = require('lodash'),
prompt = require('prompt');

prompt.message = '';
prompt.start();

var Game = function () {
  this.printer = require('./printer');
  this.deck = _.shuffle(require('./deck'));
  this.hand = require('hoyle').Hand;
  this.round = 0;
};

Game.prototype.startGame = function () {
  console.log('Dealing first row of cards, Good Luck!');

  this.p1Hands = [];
  this.p2Hands = [];
  for (var i = 0; i < 10; i++) {
    if (i < 5) {
      this.p1Hands.push([this.deck.shift()]);
    } else {
      this.p2Hands.push([this.deck.shift()]);
    }
  }

  
  this.mainLoop();
};

Game.prototype.mainLoop = function () {
  var that = this;
  if (this.round === 40) {
    this.determineWinner();
    return;
  }

  this.curr = (this.round % 2 === 0) ? 1 : 2;
  this.activeCard = this.deck.shift();
  console.log('Round Number ' + this.round);
  this.printGameState();

  var promptMessage = 'Player ' + this.curr + ' enter column number';
  prompt.get([promptMessage], function (err, input) {
    that.addToHand(parseInt(input[promptMessage], 10)); 
    that.round += 1;
    that.mainLoop();
  });
};

Game.prototype.addToHand = function (column) {
  if (this.curr === 1) {
    this.p1Hands[column].push(this.activeCard);
  } else {
    this.p2Hands[column].push(this.activeCard);
  }
};

Game.prototype.determineWinner = function () {
  var p1WinCount = 0;
  for (var i = 0; i < this.p1Hands.length; i++) {
    var hand1 = this.hand.make(this.p1Hands[i]);
    var hand2 = this.hand.make(this.p2Hands[i]);
    var winner = this.hand.pickWinners([hand1, hand2])[0];
    if (winner === hand1) {
      p1WinCount += 1;
    }
  }

  if (p1WinCount >= 3) {
    console.log('Player 1 wins');
  } else {
    console.log('Player 2 wins');
  }
  console.log('Game Over');
};

Game.prototype.printGameState = function () {
  this.printer.printHands(this.p1Hands, 'Player 1 Hands:');
  this.printer.printHands(this.p2Hands, 'Player 2 Hands:');
  console.log('current card is:', this.printer.printCard(this.activeCard));
};

var myGame = new Game();
myGame.startGame();