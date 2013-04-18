beforeEach(module('foodMeApp'));

beforeEach(function() {
  this.addMatchers({
    toHaveClass: function(className, expectedCount) {
      var error, actual = this.actual, actualCount = 0;
      this.message = function() { return error; };

      if (actual.length < expectedCount) {
        error = 'Expected at least ' + expectedCount + ' but was ' + actual.length;
      } else {
        for(var i = 0, ii = actual.length; i < ii; i++) {
          if (actual.eq(i).hasClass(className)) {
            actualCount ++;
          }
        }
        if ( actualCount !== expectedCount ) {
          error = 'Expected ' + className + ' on ' + expectedCount + ' elements but it appeared on ' + actualCount + ' elements';
        }
      }
      return !error;
    }
  });
});