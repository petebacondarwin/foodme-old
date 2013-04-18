angular.module('fmDeliverTo', [])

.directive('fmDeliverTo', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/fmDeliverTo/fmDeliverTo.template.html',
    scope: {},
    controller: function FmDeliverToController($scope, customer) {
      $scope.customer = customer;
    }
  };
});