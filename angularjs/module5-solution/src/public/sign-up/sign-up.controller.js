(function () {

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = [ 'MenuService']
function RegistrationController(MenuService) {
  var reg = this;

  reg.favMenuError = false;
  reg.completed = false;

  reg.user = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    favMenu: ""
  };

  reg.submit = function () {
    var menuCheck = MenuService.getMenuItem(reg.user.favMenu);

    menuCheck.then (
      function (response) {
        reg.favMenuError = false;
        reg.completed = true;
        MenuService.setMyInfo(reg.user);
      },
      function (response) {
        reg.completed = false;
        reg.favMenuError = true;
      }
    );

  };
}

})();
