// This is for the search query to come back
window.ls = {get: function(k){return JSON.parse(localStorage.getItem(k))}, set: function(k,v){return localStorage.setItem(k,JSON.stringify(v))}, del: function(k){return localStorage.setItem(k,undefined)}}

// We are declaring our dependencies //
var app = angular.module('flowApp', ['ui.bootstrap', 'ui.router', 'elasticsearch', 'dropstore-ng']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/search');
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
    .state("profile", {
      url: "/profile",
      templateUrl: "templates/profile.html"
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
    .state("author", {
      url: "/author",
      templateUrl: "templates/author.html"
    })
    .state("asset-detail", {
      url: "/asset-detail",
      templateUrl: "templates/asset-detail.html"
    })
})



// Calling in Directives //

.directive("loader", function(){
  return {
    templateUrl: "templates/directives/loader.html"
  }
})
