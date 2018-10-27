(function () {
    angular.module('deck', []);

    angular.module('deck').factory('deckFactory', deckFactory);

    function deckFactory() {

        var suits = [ "♣️", "♦️", "♥️", "♠️" ];

        function Card(suit, letter) {
            return {
                suit: suit,
                letter: letter,
            };
        }

        function Deck() {
            var deck = {};
            deck.cards = [];
            deck.reset = reset;
            deck.reset();

            function reset() {
                deck.cards = [];
                suits.forEach(function (suit) {
                    deck.cards.push(Card(suit, 'A'));
                    for (var i = 2; i <= 10; i++) {
                        deck.cards.push(Card(suit, i + ''));
                    }
                    deck.cards.push(Card(suit, 'J'));
                    deck.cards.push(Card(suit, 'Q'));
                    deck.cards.push(Card(suit, 'K'));
                });
            }

            return deck;
        }

        return {
            createNewDeck: Deck
        };
    }

})();