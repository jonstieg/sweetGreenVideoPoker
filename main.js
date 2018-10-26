var pokerApp = angular.module('pokerApp', []);


pokerApp.controller('PokerController', function PokerController($scope) {
	$scope.card1Turned=true;
	$scope.cardsDealt = true;
	$scope.poker = function() {
		alert("jello");
	}
});