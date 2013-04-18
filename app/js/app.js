angular.module('foodMeApp', ['customer'])

.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      controller: 'CustomerController',
      templateUrl: 'views/customer.html'
    });
});