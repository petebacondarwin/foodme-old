angular.module('restaurant', ['customer'])

.controller('RestaurantsController', function RestaurantsController($scope, customer, $location) {

  if (!customer.address) {
    $location.url('/customer');
  }

});