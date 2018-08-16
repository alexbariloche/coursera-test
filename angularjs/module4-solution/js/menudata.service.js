(function () {

'use strict';

angular.module('data')
  .service('MenuDataService', MenuDataService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
;

MenuDataService.$inject = [ '$http', 'ApiBasePath'];
function MenuDataService( $http, ApiBasePath) {
  var ds = this;

  ds.getAllCategories = function() {
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });
    return promise;
  };

  ds.getItemsForCategory = function (categoryShortName) {
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
    });
    return promise;
  };
};

})();
