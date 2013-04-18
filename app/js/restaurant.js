angular.module('restaurant', ['customer', 'ngResource'])

.factory('Restaurant', function($resource) {
  return $resource('/api/restaurant/:id', { id: '@id'});
})

.controller('RestaurantsController', function RestaurantsController($scope, customer, $location, Restaurant) {

  if (!customer.address) {
    $location.url('/customer');
  }

  $scope.restaurants = Restaurant.query();
  $scope.customer = customer;
});