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
    .state("signup", {
      url: "/signup",
      templateUrl: "templates/signup.html"
    })
    .state("login", {
      url: "/login",
      templateUrl: "templates/login.html"
    })
    .state("intro", {
      url: "/intro",
      templateUrl: "templates/intro.html"
    })
})


.directive("search", function(){
  return {
    controller: "assetSearch",
    templateUrl: "templates/directives/search.html"
  }
})

.directive("loader", function(){
  return {
    templateUrl: "templates/directives/loader.html"
  }
})
