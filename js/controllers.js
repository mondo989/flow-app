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
    var dataObj = {
        "query": {
          "match": {
            "tags": {
              "query": $scope.query,
              // Filtering by Type Soooon!     "query": $scope.query + "type:"+$scope.type,
              "operator": "AND"
            }
          }
        },"size" : 50
      };

    $http.post("http://ec2-54-153-123-48.us-west-1.compute.amazonaws.com:9200/assets/_search", dataObj).success(function(data) {
      $scope.assets = data
      var query = $scope.query.trim()
      $scope.searchTags = query ? $scope.query.split(" ") : []
      $scope.query = ""
    })


    // $http.get("db/db.json", {params:{s:$scope.query}}).success(function(data) {
    //   $scope.assets = data
    //   var query = $scope.query.trim()
    //   $scope.searchTags = query ? $scope.query.split(" ") : []
    //   $scope.query = ""
    // })
  }

  $scope.deleteTag = function($index){
    $scope.searchTags.splice($index, 1)  // Something's fucked up :)
    $scope.search()
  }

  $scope.editTags = function(){
    $scope.query = $scope.searchTags.join(" ")
  }

  $scope.newViewTransition = function () {
    // console.log("Bae");
     var assetFilter = document.querySelector('.checkbox-options-holder');
     assetFilter.classList.toggle('inactive');
     var chevronDown = document.querySelector('.fa-chevron-down');
     chevronDown.classList.toggle('rotateInMod');
  }

  $scope.downloadAssets = function() {
      var remote = require('remote');
      var BrowserWindow = remote.require('browser-window');
      console.log(BrowserWindow.getAllWindows())
      var windows = BrowserWindow.getAllWindows()
      var bottomCarousel = windows[0]



    //   var url = require('url')
    //   var indexUrl = url.format({
    //    protocol: 'file',
    //    pathname:  __dirname + '/index.html',
    //    slashes: true,
    //    hash: 'bottom-carousel'
    //  })
     //
    //  console.log(indexUrl)
    //  bottomCarousel.loadUrl(indexUrl)
     bottomCarousel.show()

     bottomCarousel.webContents.send('ping', 'image id 1,2,3!');
   }



// ------  This is fixed but still here, for properties only broken yoooo
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

  // console.log('!!!Controller Finished Loading!!!!');
}])


.controller('onboarding', ['$scope', function($scope) {
  // console.log("Hey sunshine")

  $scope.onBoardingTransitions = function(){

    // This is the delay before the second view loads
    var delay=1000; //1 seconds
    setTimeout(function(){
      window.location.href = "/#/intro";
    }, delay);

  }

}])


.controller('carouselController', ['$scope', function($scope) {

  require('ipc').on('ping', function(message) {
    console.log(message);  // Prints "whoooooooh!"
  });

}])
