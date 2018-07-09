(function () {
'use strict';

angular.module("ShoppingListCheckOff", [])
  .controller("ToBuyController", ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

ToBuyController.$inject = ["ShoppingListCheckOffService"];
function ToBuyController(ShoppingListCheckOffService) {
  var buyCtrl = this;

  buyCtrl.items = ShoppingListCheckOffService.getItemsToBuy();

  buyCtrl.bought = function (idx) {
    ShoppingListCheckOffService.bought(idx);
  };

  buyCtrl.Empty = function () {
    return ShoppingListCheckOffService.anyItemsLeftToBuy();
  };
}

AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtCtrl = this;

  boughtCtrl.items = ShoppingListCheckOffService.getItemsBought();

  boughtCtrl.Empty = function () {
    return ShoppingListCheckOffService.anyItemsBought();
  };
}

function ShoppingListCheckOffService() {
  var buyingSrv = this;

  var itemsToBuy = [
    { name: "apples", quantity: 4 },
    { name: "oranges", quantity: 10 },
    { name: "bananas", quantity: 6 },
    { name: "pears", quantity: 8 },
    { name: "lemons", quantity: 3 }
  ];
  var itemsBought = [];

  buyingSrv.getItemsToBuy = function () {
    return itemsToBuy;
  };

  buyingSrv.getItemsBought = function () {
    return itemsBought;
  };

  buyingSrv.anyItemsLeftToBuy = function () {
    return itemsToBuy.length == 0;
  };

  buyingSrv.anyItemsBought = function () {
    return itemsBought.length == 0;
  };

  buyingSrv.bought = function (idx) {
    itemsBought.push(itemsToBuy[idx]);
    itemsToBuy.splice(idx, 1);
  }
}

})();
