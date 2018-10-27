
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
		self.lastScore = 0;
		self.deckOfCards = deckFactory.createNewDeck();
		self.nextCard = self.randomNextCard();
		self.cardIndex = 0;
		self.theFlop = self.deal5();
		function deal5() {
			var set = [];
			if (self.deckOfCards) {
				for (var i = 0; self.cardIndex < 5; self.cardIndex++) {
					set.push({ key: self.deckOfCards.cards[self.nextCard[self.cardIndex]], value: false });
				}
			}

			return set;
		}
		function buttonClicked() {
			if (!self.cardsDealt) {
				for (var i = 0; i < 5; i++) {
					if (self.theFlop[i].value) {
						self.theFlop[i].key = self.deckOfCards.cards[self.nextCard[self.cardIndex]];
						self.cardIndex = self.cardIndex + 1;
						self.theFlop[i].value = false;
					}
				}
				self.lastScore = self.scoreTheHand();
				self.score = self.score + self.lastScore;
			} else {
				self.lastScore = 0;
				self.nextCard = self.randomNextCard();
				self.cardIndex = 0;
				self.deckOfCards.reset();
				self.theFlop = self.deal5();
			}

			self.cardsDealt = !self.cardsDealt;
		}
		function randomNextCard() {
			var arr = [];
			var randomNumber;
			do {
				randomNumber = Math.floor(Math.random() * 52);
				if (!arr.includes(randomNumber)) {
					arr.push(randomNumber);
				}
			} while (arr.length < 52)
			return arr;
		}
		function scoreTheHand() {
			var arr = [];
			for (var i = 0; i < 5; i++) {
				var current = self.theFlop[i].key.letter;
				switch (current) {
					case 'K':
						arr.push(13);
						break;
					case 'Q':
						arr.push(12);
						break;
					case 'J':
						arr.push(11);
						break;
					case 'A':
						arr.push(14);
						break;
					default:
						arr.push(parseInt(current));
				}

			}
			console.log(arr.sort((a, b) => a - b));

			var isItAStraight = true;
			var isThereAPair = false;
			for (var i = 1; i < 5; i++) {
				if (arr[i] == arr[i - 1] + 1) {
					isItAStraight = true && isItAStraight;
				} else {
					isItAStraight = false;
				}

				if (arr[i] == arr[i - 1]) {
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

		function keyWasPressed(event) {
				if (event.key == '1') {
					self.theFlop[0].value = !self.theFlop[0].value;
				}
				else if (event.key == '2') {
					self.theFlop[1].value = !self.theFlop[1].value;
				}
				else if (event.key == '3') {
					self.theFlop[2].value = !self.theFlop[2].value;
				}
				else if (event.key == '4') {
					self.theFlop[3].value = !self.theFlop[3].value;
				}
				else if (event.key == '5') {
					self.theFlop[4].value = !self.theFlop[4].value;
				}
				else if (event.keyCode == 32) {
					self.buttonClicked();
				}
		}
	}

})();