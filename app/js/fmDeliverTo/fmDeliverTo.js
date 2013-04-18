angular.module('fmDeliverTo', [])

.directive('fmDeliverTo', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/js/fmDeliverTo/fmDeliverTo.template.html',
    scope: {},
    controller: function FmDeliverToController($scope, customer) {
      $scope.customer = customer;
    }
  };
});