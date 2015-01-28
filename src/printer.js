var Printer = function () {};

Printer.prototype.printCard = function (card) {
  var str = card.rank + card.suit + ' ';
  switch (card.suit) {
    case 'h':
      return str.red;
    case 'd':
      return str.blue;
    case 'c':
      return str.green;
    case 's':
      return str.black;
  }
};

Printer.prototype.printHands = function (hands, title) {
  title = title || "Hands:";
  console.log('\n' + title);
  console.log('-------------------------------------------------------------');
  console.log('0  1  2  3  4');
  for (var i = 0; i < 5; i++) {
    var row = '';
    for (var j = 0; j < hands.length; j++) {
      if (hands[j][i]) {
        row += this.printCard(hands[j][i]);
      } else {
        row += 'xx '.yellow;
      }
    }
    console.log(row);
  }
};

module.exports = new Printer();