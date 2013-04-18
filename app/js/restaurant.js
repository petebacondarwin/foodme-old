angular.module('restaurant', ['customer', 'ngResource', 'fmDeliverTo', 'fmRating', 'fmCheckboxList'])

.factory('Restaurant', function($resource) {
  return $resource('/api/restaurant/:id', { id: '@id'});
})

.controller('RestaurantsController', function RestaurantsController($scope, customer, $location, Restaurant) {
  
  $scope.filter = {
    price: null,
    rating: null,
    cuisine: []
  };

  $scope.sort = {
    key: null,
    asc: false
  };

  $scope.CUISINE_OPTIONS = {
    african: 'African',
    american: 'American',
    barbecue: 'Barbecue',
    cafe: 'Cafe',
    chinese: 'Chinese',
    'czech/slovak': 'Czech / Slovak',
    german: 'German',
    indian: 'Indian',
    japanese: 'Japanese',
    mexican: 'Mexican',
    pizza: 'Pizza',
    thai: 'Thai',
    vegetarian: 'Vegetarian'
  };  

  if (!customer.address) {
    $location.url('/customer');
  }

  var allRestaurants = Restaurant.query(filterAndSortRestaurants);
  $scope.$watch('filter', filterAndSortRestaurants, true);
  $scope.$watch('sort', filterAndSortRestaurants, true);

  function filterAndSortRestaurants() {
    $scope.restaurants = [];

    // filter
    angular.forEach(allRestaurants, function(item, key) {
      if ($scope.filter.price && $scope.filter.price !== item.price) { return; }
      if ($scope.filter.rating && $scope.filter.rating !== item.rating) { return; }
      if ($scope.filter.cuisine.length && $scope.filter.cuisine.indexOf(item.cuisine) === -1) { return; }
      $scope.restaurants.push(item);
    });

    // sort
    $scope.restaurants.sort(function(a, b) {
      if (a[$scope.sort.key] > b[$scope.sort.key]) {
        return $scope.sort.asc ? 1 : -1;
      }

      if (a[$scope.sort.key] < b[$scope.sort.key]) {
        return $scope.sort.asc ? -1 : 1;
      }

      return 0;
    });
  }

  $scope.sortBy = function(key) {
    if ($scope.sort.key === key) {
      $scope.sort.asc = !$scope.sort.asc;
    } else {
      $scope.sort.key = key;
      $scope.sort.asc = true;
    }
  };

  $scope.sortIconFor = function(key) {
    if ($scope.sort.key !== key) {
      return '';
    }
    return $scope.sort.asc ? '\u25B2' : '\u25BC';
  };
})

.controller('MenuController', function MenuController($scope, $routeParams, Restaurant) {
  $scope.restaurant = Restaurant.get({id: $routeParams.restaurantId});
});