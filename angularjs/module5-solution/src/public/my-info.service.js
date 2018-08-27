(function () {
"use strict";

angular.module('public')
.service('MyInfoService', MyInfoService);


function MyInfoService() {
  var service = this;

  service.user = {
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  };

  service.setMyInfo = function (signUpUser) {
    service.user = signUpUser;
  };

  service.getMyInfo = function () {
    return service.user;
  };

};

})();
