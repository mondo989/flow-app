angular.module('flowApp')

.controller('assetSearch', ['$scope', '$http', 'es', function($scope, $http, es) {
  window.$scope = $scope
  $scope.searchTags = []

  $http.get("db/db.json").success(function(data) {
    $scope.gotAssets = data;
  });

  //clicks to assets events download assets button
  $scope.downloadActivationQueue = function () {
    console.log('button appears');
      document.getElementById("get-assets-container").className = "active";
  }

  $scope.assetFilterClicked = function () {
     var assetFilter = document.querySelector('.checkbox-options-holder');
     assetFilter.classList.toggle('inactive');
     var chevronDown = document.querySelector('.fa-chevron-down');
     chevronDown.classList.toggle('rotateInMod');
  }

  $scope.settingsClicked = function () {
    var settingsBtn = document.querySelector('.fa-cog');
    settingsBtn.classList.toggle('spin');
  }

  $scope.search = function(){
    $http.get("db/db.json", {params:{s:$scope.query}}).success(function(data) {
      $scope.assets = data
      var query = $scope.query.trim()
      $scope.searchTags = query ? $scope.query.split(" ") : []
      $scope.query = ""
    })
  }

  $scope.deleteTag = function($index){
    $scope.searchTags.splice($index, 1)  // Something's fucked up :)
    $scope.search()
  }

  $scope.editTags = function(){
    $scope.query = $scope.searchTags.join(" ")
  }



  $scope.newViewTransition = function () {
    console.log("Bae");
     var assetFilter = document.querySelector('.checkbox-options-holder');
     assetFilter.classList.toggle('inactive');
     var chevronDown = document.querySelector('.fa-chevron-down');
     chevronDown.classList.toggle('rotateInMod');
  }


// ------  This is still broken yoooo
        // $scope.downloadAssets = function() {
        //   console.log("heyyy yo")
        //       var remote = require('remote');
        //       var BrowserWindow = remote.require('browser-window');
        //       var bottomWindow = new BrowserWindow({
        //         width: 1700,
        //         height: 100,
        //         transparent: true,
        //         frame: false,
        //         resizable: true,
        //         "always-on-top": true,
        //         x: 0,
        //         y: 2699
        //       });
        //       bottomWindow.loadUrl('file://' + __dirname + '/bottom-carousel.html');
        //     }
// -------

  console.log('!!!Controller Finished Loading!!!!');
}])
