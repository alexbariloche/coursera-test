(function () {

'use strict';

angular.module('MenuApp', [ 'ui.router','data'])
  .controller('CategoriesController',CategoriesController)
  .controller('ItemsController',ItemsController)
;

CategoriesController.$inject = ['allCats'];
function CategoriesController( allCats) {
  var cc = this;
  cc.cats = allCats.data;
};

ItemsController.$inject = ['allItems'];
function ItemsController(allItems) {
  var ic = this;
  ic.items = allItems.data.menu_items;
};

})();
