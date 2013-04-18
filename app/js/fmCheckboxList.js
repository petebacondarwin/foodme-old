angular.module('fmCheckboxList', [])

.directive('fmCheckboxList', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attr, ngModel) {
      // model -> view
      ngModel.$render = function() {
        var values = ngModel.$viewValue || [];
        angular.forEach(elm.find('input'), function(input, index) {
          input.checked = values.indexOf(input.getAttribute('value')) !== -1;
        });
      };

      // view -> model
      elm.bind('click', function(e) {
        if (angular.lowercase(e.target.nodeName) === 'input') {
          scope.$apply(function() {
            var values = [];

            angular.forEach(elm.find('input'), function(input) {
              if (input.checked) {
                values.push(input.getAttribute('value'));
              }
            });

            ngModel.$setViewValue(values);
          });
        }
      });
    }
  };
 });