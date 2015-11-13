var StackedDeck = function(cheatCode) {
    // Deck
    this.shuffledDeck = [];
    
    // Works like an ID
    if (cheatCode) {
    	this.code = cheatCode;
    	StackedDeck.prototype.cheatDecks[cheatCode] = [];
    }    
}

//Register cheat decks 
StackedDeck.prototype.cheatDecks = {};

StackedDeck.prototype.shuffle = function () {
  
  	let suits = ["d", "h", "c", "s"];
  	let deck = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
	
	if (this.code && StackedDeck.prototype.cheatDecks[this.code]) {
	  	this.shuffledDeck = StackedDeck.prototype.cheatDecks[this.code];
	} else {
		for (let suit of shuffle(suits)) {
	  		for (let card of shuffle(deck)) {
	  			this.shuffledDeck.push(card+suit);
	  		}
	  	}

	  	if (this.code) {
	  		StackedDeck.prototype.cheatDecks[this.code] = this.shuffledDeck;
	  	}
	}

  	return this.shuffledDeck;
}

 
 // I used Knuth Shuffle algorithm. JS implementation is taken from SO question:
 // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}