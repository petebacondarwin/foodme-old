angular.module('menu', ['cart'])

.controller('MenuController', function MenuController($scope, $routeParams, Restaurant, cart) {
  $scope.restaurant = Restaurant.get({id: $routeParams.restaurantId});
  $scope.cart = cart;
});