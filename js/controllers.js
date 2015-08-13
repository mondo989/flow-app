angular.module('flowApp')

    .controller('assetSearch', ['$scope', '$http', 'es', function($scope, $http, es) {
      $http.get("db/db.json").success(function(data) {
        $scope.gotAssets = data;
      });

      $scope.updateQuery = function () {
        var search = $scope.query // This comes from the user's input
            console.log('You are searching for ' + search)
            // Return makes a call to server
            $http.get("db/db.json").success(function(data) {
              $scope.gotAssets = data;
              console.log(data[0].tags)
            // We need only the tags from the data
          });
      }

      $scope.addTag = function() {
        var search = $scope.query // This comes from the user's input
          var tagList = this;
          tagList.tags = [];

      tagList.addTag = function () {
          tags.push({text:tags.tagText});
          tagList.tagText = '';
        }
      }

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
