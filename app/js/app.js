angular.module('foodMeApp', ['customer'])

.controller('CustomerController', function CustomerController($scope) {
  $scope.findRestaurants = function(customerName, customerAddress) {
    alert(customerName + ' - ' + customerAddress);
  };
});
