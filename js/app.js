var app = angular.module('flowApp', ['ui.bootstrap', 'ui.router', 'elasticsearch']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/main');
  $stateProvider
    .state("main", {
      url: "/main",
      templateUrl: "templates/main.html"
    })
    .state("search", {
      url: "/search",
      templateUrl: "templates/search.html"
    })
    .state("bottom-carousel", {
      url: "/bottom-carousel",
      templateUrl: "templates/bottom-carousel.html"
    })
    .state("intro", {
      url: "/intro",
      templateUrl: "templates/intro.html"
    })
})
