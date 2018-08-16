(function () {

'use strict';

angular.module('data')
  .component('items', {
    templateUrl: 'templates/items.html',
    bindings: {
      items: '<'
    }
  })
;

})();
