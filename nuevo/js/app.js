(function () {
'use strict';

// Function that shows 'loading' gif
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Main page content snippets
var homeHtmlUrl = "snippets/home-snippet.html";
var MisasHtmlUrl = "snippets/misas-snippet.html";
var HomiliasHtmlUrl = "snippets/homilias-snippet.html";

// Function that inserts content at html element
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// First main page content loading
document.addEventListener("DOMContentLoaded", function (event) {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    homeHtmlUrl,
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

var homilias = {
  "actuales":
  [
    {
      "tiempo": "Pascual",
      "descripcion": "Domingo XI",
      "fecha" : "08/07/2018",
      "audio" : "media/homilias/Domingo XI Tiempo Ordinario 2018.mp3"
    },
    {
      "tiempo": "Ordinario",
      "descripcion": "Domingo X",
      "fecha" : "01/07/2018",
      "audio" : "media/homilias/Domingo X Tiempo Ordinario 2018.mp3"
    }
  ],
  "historicas":
  [
  ]
};

// AngularJS code
angular.module('SanEduardoApp', [])
  .controller('MenuController', menuController)
  .service('MenuService', menuService);

menuController.$inject = ['MenuService'];
function menuController( menuService) {
  var menuCtrl = this;

  menuCtrl.Inicio = function () {
    menuService.GetMainContent(homeHtmlUrl);
  };

  menuCtrl.Misas = function () {
    menuService.GetMainContent(MisasHtmlUrl);
  };

  menuCtrl.Homilias = function () {
    menuService.GetMainContent(HomiliasHtmlUrl);
  };
  
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

})();
