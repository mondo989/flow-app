angular.module('flowApp')

.controller('assetSearch', ['$scope', '$http', 'es', function($scope, $http, es) {
  window.$scope = $scope // For testing
  $scope.query = ""
  $scope.searchTags = []

  $scope.downloadActivationQueue = function () {
    // console.log('button appears');
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

    var query = $scope.query.trim()
    if (!$scope.searchTags.length && !query) {console.log("No query."); return false;}
    if ($scope.searchTags.indexOf(query)>=0) {console.log("No duplicate tags pls."); return false}
    else if (query) {
      if (query.indexOf(" ")>=0) $scope.searchTags = $scope.searchTags.concat(query.split(" "))
      else $scope.searchTags.push(query)
    }
    $scope.query = ""
    var q = $scope.searchTags.join(" ")
    if ($scope.lastQ == q) {console.log("No query."); return false;}
    $scope.lastQ = q
    document.querySelector(".content-holder").scrollTop = 0
    var dataObj = {
      "query": {
        "match": {
          "tags": {
            "query": q,
            // Filtering by Type Soooon!     "query": $scope.query + "type:"+$scope.type,
            "operator": "AND"
          }
        }
      },"size" : 50
    };
    $http.post("http://www.tryflow.io:9200/assets/_search", dataObj).success(function(data) {
      $scope.assets = data
      window.ls.set("lastSearch", {query: $scope.query, searchTags: $scope.searchTags})
    })
  }

  $scope.deleteTag = function($index){
    $scope.searchTags.splice($index, 1)  // Something's fucked up :)
    $scope.search()
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

    bottomCarousel.show()

    var itemsToDisplay = []
    var selectedItems = document.querySelectorAll('.selected');

    for (i = 0; i < selectedItems.length; ++i) {
      for(j=0;j<$scope.assets.hits.hits.length;j++)
      {
        if($scope.assets.hits.hits[j]._id==selectedItems[i].attributes[0].value)
        {
          console.log("copy this selected item's metadata from elastic search and send to carousell view"+selectedItems[i].attributes[0].value)
          itemsToDisplay.push($scope.assets.hits.hits[j])
        }
      }
    }
    console.log("selectedItems "+selectedItems)
       for(i=0;i<itemsToDisplay.length;i++) {
         itemsToDisplay[i]._source.imgPsd=itemsToDisplay[i]._source.imgSrc.replace("asset-img", "asset-raw").replace('.png','.psd')
       }
     bottomCarousel.webContents.send('ping', itemsToDisplay);
   }


   document.addEventListener("keypress", function(e){
     console.log("hi", e.keyCode)
     // console.log("hi", e)

     var query = $scope.query.trim()
     if (e.keyCode == 13 && !query) {
       document.querySelector(".content-holder").scrollTop += 400
     }
     if (e.keyCode == 61 && !query) {
       $scope.searchTags.pop()
       $scope.$apply()
       $scope.search()
       // e.preventDefault()
       // e.stopPropagation()
       console.log("hi")
       // return false
     }
   })

   var lastSearch = window.ls.get("lastSearch")

   if (lastSearch) {
     $scope.query = lastSearch.query || ""
     $scope.searchTags = lastSearch.searchTags || []
     $scope.search()
   }

/*
   $scope.toggleAssets = function(param) {
    console.log("recieved:" + param )
   }
*/

}])  // End of asset search controller




// Onboarding Controller Yoooo!
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

// BOTTOM CAROUSEL CONTROLLER
// Calls bottom carousel window, png's & psd's of selected assets.
.controller('carouselController', ['$scope','$http', function($scope,$http) {
  window.$scope = $scope
  $scope.assets = []









  require('ipc').on('ping', function(message) {
    $scope.$apply(function() {
      $scope.assets=message
    });

      for(i=0;i<$scope.assets.length;i++) {
        $scope.downloadPSD($scope.assets[i]._source.imgPsd,'./imgs/'+ $scope.assets[i]._id+'.psd', $scope.assets[i]._id);
      }
    console.log("Got items to display!!! OWWW YEAHHH: "+JSON.stringify(message));  // Prints "whoooooooh!"


    $scope.openOutsideApplication = function() {

            var fs = require('fs'),
            exec = require('child_process').exec;

// {{asset._source.imgPsd}}

            console.log('opening Photoshop');
            // This is a static string, it needs to be a variable at the end
             var child = exec('open -a "Adobe\ Photoshop\ CS6" "/Users/armandoflores/Desktop/flow-app/imgs/AU-1YVAQr0A0Z0XKxgoJ.psd"',
             function (err, stdout, stderr) { console.log('heyyyyyi',err,stdout, stderr) });
           }




  });


// Makes search window hide on Bottom Carousel Click
  $scope.hideSearchWindow = function() {

    var remote = require('remote');
    var BrowserWindow = remote.require('browser-window');
    var windows = BrowserWindow.getAllWindows()
    var searchWindow = windows[1]

    searchWindow.hide()

    setInterval(function(){
     document.querySelector('.fa-search').classList.toggle('attention');
  }, 2000);


  }

  $scope.showSearchWindow = function() {

    var remote = require('remote');
    var BrowserWindow = remote.require('browser-window');
    var windows = BrowserWindow.getAllWindows()
    var searchWindow = windows[1]

    searchWindow.show()
      document.querySelector('.fa-search').classList.toggle('active');
  }


  $scope.downloadPSD = function (imageURL,imgName, imgId) {
    console.log("Downloading..."+imageURL)

    var fs = require('fs'),
        request = require('request');

    var download = function(uri, filename, progress_callback, end_callback){
      request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        var AWS = require('aws-sdk');
            AWS.config.region = 'us-west-1';

            AWS.config.update({
                accessKeyId:  "AKIAJVSGAOUL32MUL33A",
                secretAccessKey: "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",
                "region": "us-west-1"
            });

         var s3 = new AWS.S3();
         var params = {Bucket: 'asset-raw', Key: uri.substring(uri.lastIndexOf('/')+1)};
         var file = require('fs').createWriteStream(filename);

        s3.getObject(params)
          .on('httpData', function(chunk) { /*console.log(chunk.length);*/ file.write(chunk); })
          .on('httpDownloadProgress', function (progress) {
            progress_callback(Math.round(progress.loaded/progress.total*100.0));
            //console.log("Downloaded" + progress.loaded + "of"+ progress.total+ "bytes");
          })
          .on('httpDone', function() { file.end();  end_callback(); })
          .send();
      });
    };

  //spinner start loading for image on div ID xxx
      download(imageURL, imgName, function(percent){
                // console.log('progess '+percent);
                document.getElementById('percent-' + imgId).innerHTML= percent+"%";
          }, function(){
              console.log('done');
              console.log(imgId);

            //Spinner loads
              document.getElementById('loader-' + imgId).style.visibility= "hidden";
              console.log('Loader jquery:' + document.getElementById('loader-' + imgId))
            // $scope.assets[i]._source.imgSrc,'./imgs/'+ $scope.assets[i]._id+'.png';
             });
          }
      }])


.controller('placeholderCtrl', ['$scope', function($scope) {
  var tempName = ["iPhone", "iPad", "iPhone", "icons"];

  $scope.assetDemo = tempName;

  for (var i = 0; i < tempName.length; i++) {
    setInterval(function(){
        tempName[i]
    }, 1000)
  }

}])

.controller('authorCtrl', ['$scope', function($scope) {

  $scope.ModalListClicked = function () {
    document.querySelector('.uploadModal').classList.toggle('active');
  }
  $scope.closeModal = function() {
    document.querySelector('.uploadModal').classList.toggle('active');
  }


  console.log('Author Controller done loadin')
}])
