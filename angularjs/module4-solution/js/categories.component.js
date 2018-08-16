(function () {

'use strict';

angular.module('data')
  .component('categories', {
    templateUrl: 'templates/categories.html',
    bindings: {
      cats: '<'
    }
  })
;

})();
