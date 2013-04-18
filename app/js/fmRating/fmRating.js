angular.module('fmRating', [])

.directive('fmRating', function() {
  return {
    restrict: 'E',

    scope: {
      symbol: '@',
      readonly: '@',
      max: '@',
      rating: '='
    },

    link: function(scope, element, attrs) {

      scope.$watch('max', function(value) {
        // Recreate the array of styles for each rating symbol
        var max = parseInt(value || 5, 10);
        scope.styles = [];
        for(var i = 0; i < max; i ++) {
          scope.styles.push({ 'fm-selected': false, 'fm-hover': false });
        }
      });


      scope.enter = function(index) {
        // Mouse is over a symbol so update the styles
        if (scope.readonly) return;
        angular.forEach(scope.styles, function(style, i) {
          style['fm-hover'] = i <= index;
        });
      };

      scope.leave = function(index) {
        // Mouse is no longer over a symbol so update the styles
        if (scope.readonly) return;
        angular.forEach(scope.styles, function(style, i) {
          style['fm-hover'] = undefined;
        });
      };


      scope.select = function(index) {
        if (scope.readonly) return;
        scope.rating = (index === null) ? null : index + 1;
      };

      scope.$watch('rating', function(value) {
        updateSelectedStyles(value - 1);
      });


      function updateSelectedStyles(index) {
        if (index === null) index = -1;
        angular.forEach(scope.styles, function(style, i) {
          style['fm-selected'] = i <= index;
        });
      }

    },

    templateUrl: 'js/fmRating/fmRating.template.html'
  };
});