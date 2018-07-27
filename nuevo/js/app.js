(function () {
'use strict';

// Function that shows 'loading' gif
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Main page content snippets

// Function that inserts content at html element
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// First main page content loading
document.addEventListener("DOMContentLoaded", function (event) {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    "snippets/home-snippet.html",
    function (homeHtml) {
      insertHtml("#main-content", homeHtml);
    },
    false);
});

// JQuery function for menu collapsing to hamburger button on narrow screens
$(function () {
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

// AngularJS code
angular.module('SanEduardoApp', [])
  .controller('MenuController', menuController)
  .service('MenuService', menuService)
  .directive('mainContent', mainContentDirective)
  .directive('misasContent', misasContentDirective)
  .directive('homiliasContent', homiliasContentDirective);

// Main directive
function mainContentDirective() {
  var ddo = {
    templateUrl: "snippets/home-snippet.html"
  };
  return ddo;
}

// Misas directive
function misasContentDirective() {
  var ddo = {
    templateUrl: "snippets/misas-snippet.html",
    controller: misasContentDirectiveController,
    controllerAs: 'misas',
    bindToController: true
};
  return ddo;
}

misasContentDirectiveController.$inject = [ '$http'];
function misasContentDirectiveController( $http) {
  var misas = this;

  // Get Json with Masses to offer
  $http ({
    method: 'GET',
    url: 'media/misas.json'
  }).then( function (response) {
    misas.list = response.data;
  }, function (error) {
    console.log(error);
  });
}

// Homilies directive
function homiliasContentDirective() {
  var ddo = {
    templateUrl: "snippets/homilias-snippet.html",
    controller: homiliasContentDirectiveController,
    controllerAs: 'homilias',
    bindToController: true
  };
  return ddo;
}

homiliasContentDirectiveController.$inject = [ '$http'];
function homiliasContentDirectiveController( $http) {
  var homilias = this;

  // Get Json with Homilies to offer
  $http ({
    method: 'GET',
    url: 'media/homilias.json'
  }).then( function (response) {
    homilias.list = response.data;
  });
}

menuService.$inject = [ '$http'];
function menuService( $http) {
  var menuSrvc = this;

  menuSrvc.GetMainContent = function (url) {
    showLoading("#main-content");
    return $http({
      method: 'GET',
      url: url
    }).then( function (response) {
      insertHtml("#main-content", response.data);
      $("#collapsable-nav").collapse('hide');
    });
  };
}

menuController.$inject = ['MenuService'];
function menuController( menuService) {
  var menuCtrl = this;

  menuCtrl.inicio = true;
  menuCtrl.homilias = false;
  menuCtrl.misas = false;

  menuCtrl.Inicio = function () {
    menuCtrl.inicio = true;
    menuCtrl.homilias = false;
    menuCtrl.misas = false;
  };

  menuCtrl.Misas = function () {
    menuCtrl.inicio = false;
    menuCtrl.homilias = false;
    menuCtrl.misas = true;
  };

  menuCtrl.Homilias = function () {
    menuCtrl.inicio = false;
    menuCtrl.misas = false;
    menuCtrl.homilias = true;
  };

}

})();
