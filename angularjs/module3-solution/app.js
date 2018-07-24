(function () {

'use strict';

angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', narrowItDownController)
  .service('MenuSearchService', menuSearchService)
  .directive('foundItems', foundItemsDirective)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

// Controller
narrowItDownController.$inject = ['MenuSearchService'];
function narrowItDownController(menuSearchService) {
  var narrower = this;
  narrower.found = [];
  narrower.emptyMessage = "Enter a search term";

  narrower.getMatchedMenuItems = function () {
    var promise = menuSearchService.getMatchedMenuItems(narrower.searchTerm);
    promise.then(function (itemsMatched) {
      narrower.found = itemsMatched;
      if (narrower.found.length === 0) {
        narrower.emptyMessage = "Nothing Found";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  narrower.removeItem = function (index) {
    narrower.found.splice(index,1);
    if (narrower.found.length === 0) {
      narrower.emptyMessage = "All Menu choices removed";
    }
  };

};

// Service
menuSearchService.$inject = ['$http', 'ApiBasePath'];
function menuSearchService($http, ApiBasePath) {
  var searcher = this;

  // Get menu items that match the search searchTerm
  // ** note: the case of text is ignored => "Veal" will get VEAL, Veal, veal, etc**
  searcher.getMatchedMenuItems = function (searchTerm) {
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return promise.then(function (menuItems) {
      var items = [];
      if ((searchTerm !== undefined) && (searchTerm !== "") &&
          (menuItems !== undefined) && (menuItems.data.menu_items.length > 0)) {
        for (var item in menuItems.data.menu_items) {
          var itemDesc = menuItems.data.menu_items[item].description;
          if ( itemDesc.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            items.push(menuItems.data.menu_items[item]);
          }
        }
      }
      return items;
    })
    .catch(function (error) {
      console.log(error);
    })
  };
};

function foundItemsDirective() {
  var ddo = {
    templateUrl: 'found-items.html',
    scope: {
      items: '<',
      emptyMessage: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'found',
    bindToController: true
  };
  return ddo;
};

function FoundItemsDirectiveController() {
  var found = this;

  found.emptyList = function () {
    return ((found.items === undefined) ||(found.items.length === 0));
  }
}
})();
