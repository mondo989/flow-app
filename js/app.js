var app = angular.module('flowApp', ['ui.bootstrap', 'ui.router', 'elasticsearch']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/main');
  $stateProvider
    .state("main", {
      title: "Main Page",
      url: "/main",
      templateUrl: "templates/main.html"
    })
    .state("search", {
      title: "Search for Assets",
      url: "/search",
      templateUrl: "templates/search.html"
    })
    .state("bottom-carousel", {
      title: "Bottom Carousel",
      url: "/bottom-carousel",
      templateUrl: "templates/bottom-carousel.html"
    })
    .state("intro", {
      title: "Login Signup",
      url: "/intro",
      templateUrl: "templates/intro.html"
    })
})
