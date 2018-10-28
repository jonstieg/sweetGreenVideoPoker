(function () {
	angular.module('pokerApp', ['deck']);
	angular
		.module('pokerApp')
		.controller('PokerController', PokerController);

	PokerController.$inject = ['deckFactory'];

	function PokerController(deckFactory) {
		var self = this;

		self.deal5 = deal5;
		self.buttonClicked = buttonClicked;
		self.randomNextCard = randomNextCard;
		self.scoreTheHand = scoreTheHand;
		self.keyWasPressed = keyWasPressed;

		self.score = 0;
		self.lastScore = "Welcome to Video Poker+"
		self.deckOfCards = deckFactory.createNewDeck();
		self.nextCard = self.randomNextCard();
		self.nextCardIndex = 0;
		self.theFlop = self.deal5();
		self.cardsDealt = true;

		// i am creating an array of 52 random numbers that i'll use to grab the next card on the deck
		function randomNextCard() {
			var randomCards = [];
			var randomNumber;
			do {
				randomNumber = Math.floor(Math.random() * 52);
				if (!randomCards.includes(randomNumber)) {
					randomCards.push(randomNumber);
				}
			} while (randomCards.length < 52)
			return randomCards;
		}

		function deal5() {
			var flop = [];
			for (var i = 0; self.nextCardIndex < 5; self.nextCardIndex++) {
				flop.push({ key: self.deckOfCards.cards[self.nextCard[self.nextCardIndex]], value: false });
			}
			return flop;
		}

		function buttonClicked() {
			if (self.cardsDealt) {
				for (var i = 0; i < 5; i++) {
					if (self.theFlop[i].value) {
						self.theFlop[i].key = self.deckOfCards.cards[self.nextCard[self.nextCardIndex]];
						self.nextCardIndex = self.nextCardIndex + 1;
						self.theFlop[i].value = false;
					}
				}
				self.lastScore = self.scoreTheHand();
				self.score = self.score + self.lastScore;
			} else {
				self.lastScore = '';
				self.nextCard = self.randomNextCard();
				self.nextCardIndex = 0;
				self.deckOfCards.reset();
				self.theFlop = self.deal5();
			}

			self.cardsDealt = !self.cardsDealt;
		}

		function scoreTheHand() {
			var toScore = [];
			for (var i = 0; i < 5; i++) {
				var current = self.theFlop[i].key.letter;
				switch (current) {
					case 'A':
						toScore.push(14);
						break;
					case 'K':
						toScore.push(13);
						break;
					case 'Q':
						toScore.push(12);
						break;
					case 'J':
						toScore.push(11);
						break;
					default:
						toScore.push(parseInt(current));
				}
			}

			// swap ace to be a 1 if there might be a low straight
			if (toScore.includes(2) && toScore.includes(14)) {
				for (var i = 0; i < 5; i++) {
					if (toScore[i] == 14) {
						toScore[i] = 1;
					}
				}
			}

			// sort for easier straight checking
			toScore = toScore.sort((a, b) => a - b);

			var isItAStraight = true;
			var isThereAPair = false;

			for (var i = 1; i < 5; i++) {
				if (isItAStraight) {
					if (toScore[i] == toScore[i - 1] + 1) {
						isItAStraight = true && isItAStraight;
					} else {
						isItAStraight = false;
					}
				}

				if (toScore[i] == toScore[i - 1]) {
					isThereAPair = true;
				}
			}

			if (isItAStraight) {
				return 500;
			} else if (isThereAPair) {
				return 100;
			} else {
				return 0;
			}
		}

		// i really like keyboard shortcuts so I added them to the game - makes it much more fun to play
		function keyWasPressed(event) {
			var cardsToFlip = ["1", "2", "3", "4", "5"];

			// you can only switch over cards before they are swapped
			if (self.cardsDealt) {
				if (cardsToFlip.includes(event.key)) {
					var indexOfCard = parseInt(event.key) - 1;
					self.theFlop[indexOfCard].value = !self.theFlop[indexOfCard].value;					
				}
			}
			if (event.keyCode == 32) {
				self.buttonClicked();
			}
		}
	}
})();