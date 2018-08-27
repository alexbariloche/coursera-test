(function () {

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = [ 'MyInfoService']
function RegistrationController(MyInfoService) {
  var reg = this;

  reg.completed = false;
  reg.user = {
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  };

  reg.submit = function () {
    reg.completed = true;
    MyInfoService.setMyInfo(reg.user);
  };
}

})();
