angular.module('navbar',[])

.controller('NavbarController', function NavbarController($scope, $location) {

  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

});