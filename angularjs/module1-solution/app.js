(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchChecker);

LunchChecker.$inject = ['$scope'];
function LunchChecker( $scope) {
  $scope.lunchMenu = "";
  $scope.msg = "";
  $scope.msgColor = 'white';

  $scope.checkLunch = function () {
    var itemList = $scope.lunchMenu.split(',');
    var itemCount = itemList.length;

    // Do not count empty items, includes case of empty lunchMenu
    var item;
    for (item in itemList) {
      if (itemList[item].trim().length === 0) {
        itemCount--;
      }
    }

    // Get correct message and viewing attributes for .message class
    switch (itemCount) {
      case 0:
        $scope.msg = "Please enter data first";
        $scope.msgColor = 'red';
        break;
      case 1:
      case 2:
      case 3:
        $scope.msg = "Enjoy!";
        $scope.msgColor = 'green';
        break;
      default:
        $scope.msg = "Too much!";
        $scope.msgColor = 'green';
        break;
    };
  }
}
})();
