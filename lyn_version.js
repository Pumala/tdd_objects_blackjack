function newDeck() {
  var deck = [];
  for (var i = 0; i < 4; i++) {
    var suit = {
      0: 'hearts',
      1: 'diamonds',
      2: 'clubs',
      3: 'spades'
    }
    for (var k = 1; k <= 13; k++) {
      deck.push(
        { point: k, suit: suit[i] }
      );
    }
  }
  return(deck);
}

Card = function(point, suit) {
  this.point = point;
  this.suit = suit;
}

Card.prototype.getImageUrl = function() {
  var point = this.point;

  if (point === 11) {
    point = 'jack';
  } else if (point === 12) {
    point = 'queen';
  } else if (point === 13) {
    point = 'king'
  } else if (point === 1) {
    point = 'ace';
  }

  return 'images/' + point + '_of_' + this.suit + '.png';
}

function Hand() {
  this.cards = [];
  this.points = 0;

  this.getPoints = function() {
    var cards = this.cards;
    var length = this.cards.length;
    var totalPoints = 0;
    var counter = 0;

    this.points = cards.map(function(card) {
    if (card.point > 10) {
      card.point = 10;
    }
    counter++;
    if (card.point !== 1) {
      totalPoints += card.point;
    }
    if (counter === length) {
      if (totalPoints <= 10) {
        if (card.point === 1) {
          card.point = 11;
        }
      }
    }
    return card.point
    }).reduce(function(a, b) {
      return a + b;
    }, 0);
    return this.points;
  }

  this.addCard = function(newCard) {
    this.cards.push({point: newCard.point, suit: newCard.suit});
  };
}

// function shuffle (array) {
//   var i = 0, j = 0, temp = null;;
//
//   for (i = array.length - 1; i > 0; i -= 1) {
//     j = Math.floor(Math.random() * (i + 1));
//     temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
//   }
//   return array;
// }

function Deck() {
  this.deck = newDeck();
  this.usedCards = [];

  this.draw = function() {
    var drawnCard = this.deck[0];

    this.usedCards.push(drawnCard);
    this.usedCards.push(this.deck.splice(0, 1));
    console.log(drawnCard);
    return drawnCard;
  }
  this.shuffle = function() {
    var array = this.deck;
    var i = 0, j = 0, temp = null;;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    this.deck = array;
    return this.deck;
  }
  this.numCardsLeft = function() {
    return this.deck.length;
  }
}

var myCard = new Card(5, 'diamonds')

var myHand = new Hand();
myHand.addCard(new Card(5, 'diamonds'))
myHand.addCard(new Card(13, 'spades'))
myHand.getPoints()

// var myDeck = new Deck();
// myDeck.draw();
// myDeck.shuffle();
// myDeck.shuffle();
