(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.user = {
    registeredUser: false,
    userInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      favMenu: "",
      menuItem: {}
    }
  };

  service.setMyInfo = function (signUpUser) {
    service.user.registeredUser = true;
    service.user.userInfo = signUpUser;
  };

  service.getMyInfo = function () {
    return service.user;
  };

  service.resetMyInfo = function () {
    service.user.registeredUser = false;
  }

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (item) {
    var itemUrl = '/menu_items/' + item + '.json';

    return $http.get(ApiPath + itemUrl);
  };

}

})();
