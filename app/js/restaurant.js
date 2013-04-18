angular.module('restaurant', ['customer', 'ngResource', 'fmDeliverTo', 'fmRating'])

.factory('Restaurant', function($resource) {
  return $resource('/api/restaurant/:id', { id: '@id'});
})

.controller('RestaurantsController', function RestaurantsController($scope, customer, $location, Restaurant) {
  
  $scope.filter = {
    price: null,
    rating: null
  };

  if (!customer.address) {
    $location.url('/customer');
  }

  var allRestaurants = Restaurant.query(filterRestaurants);
  $scope.$watch('filter', filterRestaurants, true);

  function filterRestaurants() {
    $scope.restaurants = [];

    // filter
    angular.forEach(allRestaurants, function(item, key) {
      if ($scope.filter.price && $scope.filter.price !== item.price) { return; }
      if ($scope.filter.rating && $scope.filter.rating !== item.rating) { return; }
      $scope.restaurants.push(item);
    });
  }
})

.controller('MenuController', function MenuController($scope, $routeParams, Restaurant) {
  $scope.restaurant = Restaurant.get({id: $routeParams.restaurantId});
});