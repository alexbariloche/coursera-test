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
    favMenu: "",
    menuItem: {}
  };

  reg.submit = function () {
    var menuCheck = MenuService.getMenuItem(reg.user.favMenu);

    menuCheck.then (
      function (response) {
        reg.favMenuError = false;
        reg.completed = true;
        reg.user.menuItem = response.data;
        MenuService.setMyInfo(reg.user);
      },
      function (response) {
        reg.completed = false;
        reg.favMenuError = true;
        MenuService.resetMyInfo();
      }
    );

  };
}

})();
