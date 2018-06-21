$(function () {

  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function (global) {

  var dc = {};

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

  dc.Misas = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      MisasHtmlUrl,
      function (homeHtml) {
        // switchMenuToActive();
        insertHtml("#main-content", homeHtml);
        $("#collapsable-nav").collapse('hide');
      },
      false);
  };

  dc.Homilias = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      HomiliasHtmlUrl,
      function (homeHtml) {
        insertHtml("#main-content", homeHtml);
        $("#collapsable-nav").collapse('hide');
      },
      false);
  };

  dc.Inicio = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (homeHtml) {
        insertHtml("#main-content", homeHtml);
        $("#collapsable-nav").collapse('hide');
      },
      false);
  };

  document.addEventListener("DOMContentLoaded", function (event) {

    showLoading("#main-content");

    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (homeHtml) {
        insertHtml("#main-content", homeHtml);
      },
      false);
  });

  global.$dc = dc;

})(window);
