angular.module('customer', ['localStorage'])

.factory('customer', function($rootScope, localStorage) {

  var LOCAL_STORAGE_ID = 'fmCustomer',
      customerString = localStorage[LOCAL_STORAGE_ID];

  var customer = customerString ? JSON.parse(customerString) : {
    name: undefined,
    address: undefined
  };

  $rootScope.$watch(function() { return customer; }, function() {
    localStorage[LOCAL_STORAGE_ID] = JSON.stringify(customer);
  }, true);

  return customer;
})

.controller('CustomerController', function CustomerController($scope, customer) {
  $scope.customerName = customer.name;
  $scope.customerAddress = customer.address;

  $scope.findRestaurants = function(customerName, customerAddress) {
    customer.name = customerName;
    customer.address = customerAddress;
  };
});
