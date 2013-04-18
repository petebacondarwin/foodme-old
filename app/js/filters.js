angular.module('filters', [])

.filter('dollars', function() {
  var DOLLARS = {
    1: '$',
    2: '$$',
    3: '$$$',
    4: '$$$$',
    5: '$$$$$'
  };
 
  return function(dollarCount) {
    return DOLLARS[dollarCount];
  };
})

.filter('stars', function() {
  var STARS = {
    1: '\u2605',
    2: '\u2605\u2605',
    3: '\u2605\u2605\u2605',
    4: '\u2605\u2605\u2605\u2605',
    5: '\u2605\u2605\u2605\u2605\u2605'
  };
 
  return function(dollarCount) {
    return STARS[dollarCount];
  };
});