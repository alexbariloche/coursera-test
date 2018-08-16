(function () {

'use strict';

angular.module('MenuApp')
  .config(RoutesConfig)
;

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state( 'home', {
      url: '/',
      templateUrl: 'templates/home.html'
    })
    .state( 'categories', {
      url: '/categories',
      templateUrl: 'templates/main-categories.html',
      controller: 'CategoriesController as catsList',
      resolve: {
        allCats: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
        }]
      }
    })
    .state( 'items', {
      url: '/items/{catId}',
      templateUrl: 'templates/main-items.html',
      controller: 'ItemsController as itemsList',
      resolve: {
        allItems: ['$stateParams', 'MenuDataService',
          function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.catId);
        }]
      }
    });
  $urlRouterProvider
    .otherwise( '/');
};

})();
