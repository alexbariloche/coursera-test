(function () {
'use strict';

var homeHtmlUrl = "snippets/home-snippet.html";
var MisasHtmlUrl = "snippets/misas-snippet.html";
var HomiliasHtmlUrl = "snippets/homilias-snippet.html";

var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
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

// AngularJS code
angular.module('SanEduardoApp', [])
.controller('MenuController', menuController);

menuController.$inject = [];
function menuController() {
  var menu = this;

  menu.Misas = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      MisasHtmlUrl,
      function (homeHtml) {
        insertHtml("#main-content", homeHtml);
        $("#collapsable-nav").collapse('hide');
      },
      false);
  };

  menu.Homilias = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      HomiliasHtmlUrl,
      function (homeHtml) {
        insertHtml("#main-content", homeHtml);
        $("#collapsable-nav").collapse('hide');
      },
      false);
  };

  menu.Inicio = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (homeHtml) {
        insertHtml("#main-content", homeHtml);
        $("#collapsable-nav").collapse('hide');
      },
      false);
  };
}

})();
