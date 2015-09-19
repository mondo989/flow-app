angular.module('flowApp')

.controller('assetSearch', ['$scope', '$http', 'es', function($scope, $http, es) {
  window.$scope = $scope // For testing
  $scope.query = ""
  $scope.searchTags = []


  //clicks to assets events download assets button
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

  document.addEventListener("keydown", function(e){ // this is firing twice.
    var query = $scope.query.trim()
    if (e.keyCode == 13 && !query) {
      window.scrollBy(0, 400)
    }
    if (e.keyCode == 8 && !query) {
      $scope.searchTags.pop()
      $scope.$apply()
      $scope.search()
    }
  })
  
  $scope.search = function(){
    var query = $scope.query.trim()
    if (!query) {console.log("No query."); return false;}
    if ($scope.searchTags.indexOf(query)>=0) {console.log("No duplicate tags pls."); return false}
    else {
      if (query.indexOf(" ")>=0) $scope.searchTags = $scope.searchTags.concat(query.split(" "))
      else $scope.searchTags.push(query)
    }
    $scope.query = ""
    var dataObj = {
        "query": {
          "match": {
            "tags": {
              "query": $scope.searchTags.join(" "),
              // Filtering by Type Soooon!     "query": $scope.query + "type:"+$scope.type,
              "operator": "AND"
            }
          }
        },"size" : 50
      };

    $http.post("http://ec2-54-153-123-48.us-west-1.compute.amazonaws.com:9200/assets/_search", dataObj).success(function(data) {
      $scope.assets = data
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

     bottomCarousel.webContents.send('ping', itemsToDisplay);
   }


/*
   $scope.toggleAssets = function(param) {
    console.log("recieved:" + param )
   }
*/

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

// Calls bottom carousel window, png's & psd's of selected assets.
.controller('carouselController', ['$scope','$http', function($scope,$http) {
  window.$scope = $scope
  $scope.assets = []


  require('ipc').on('ping', function(message) {
    $scope.$apply(function() {
      $scope.assets=message
    });

    for(i=0;i<$scope.assets.length;i++) {
        /*var url = require('url')
        var fileUrl = url.format({
         protocol: 'file',
         pathname:  '__dirname + '/img'/'+$scope.assets[i]._id+'.png',
         slashes: true,
       })*/
     $scope.downloadPSD($scope.assets[i]._source.imgSrc,'./imgs/'+ $scope.assets[i]._id+'.png', $scope.assets[i]._id);
    }
    console.log("Got items to display!!! OWWW YEAHHH: "+JSON.stringify(message));  // Prints "whoooooooh!"
  });

  $scope.downloadPSD = function (imageURL,imgName, imgId) {
    console.log("Downloading..."+imageURL)

    var fs = require('fs'),
        request = require('request');

    var download = function(uri, filename, callback){
      request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    //spinner start loading for image on div ID xxx

    download(imageURL, imgName, function(){
      console.log('done');
      console.log(imgId);
        document.getElementById('loader-' + imgId).style.visibility= "hidden";
        console.log('Loader jquery:' + document.getElementById('loader-' + imgId))
      //spinner stop loading for image on div ID xxx

  // $scope.assets[i]._source.imgSrc,'./imgs/'+ $scope.assets[i]._id+'.png';

      //img src to file://hddrfrf/rf/erf/ref/img.psd
  });

  /*
      var options = {url: imageURL};
      $http.get(options, imgName, function (error, result) {
          if (error) {
              console.error("Error:"+error);
          } else {
              console.log('File downloaded at: ' + result.file);
          }
      });
  */
  /*
  $http.get(imageURL).success(function(response) {
  //$http.get(imageURL,{responseType: "blob"}).success(function(response) {
  //  $http.get(imageURL,{responseType: "arraybuffer"}).success(function(response) {
        console.log("Downloaded! "+imageURL)
        //console.log("data! "+image_data)

        //var byteArray = new Uint8Array(response);
      //  var blob = new Blob([response], {type: "image/png"});

                           try {
                              console.log("Saving "+imgName)

                              require('fs').writeFileSync(imgName, response, 'binary');
                              console.log('Saved image!');
                            } catch (err) {
                                throw err;
                            }


      })*/

  }
}])
