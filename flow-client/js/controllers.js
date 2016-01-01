// returns the window defined by it's title
var getWindowByTitle = function(title) {
    var remote = require('remote');
    var BrowserWindow = remote.require('browser-window');
    var windows = BrowserWindow.getAllWindows()
    var res = null;
    for (var i = 0; i < windows.length;i++)
      if ((windows[i]["webContents"] === undefined) || (windows[i]["webContents"]["browserWindowOptions"] === undefined))
        return null;
      else if (windows[i]["webContents"]["browserWindowOptions"]["title"] == title )
        return windows[i];
    return null;
};

// if all windows are hidden, close app
var checkAllWindowClosed = function() {
    var remote = require('remote');
    var BrowserWindow = remote.require('browser-window');
    var windows = BrowserWindow.getAllWindows()
    console.log("checking All windows closed");
    for (var i = 0; i < windows.length;i++)
      if (windows[i].isVisible())
        return false;
    console.log("All windows closed");
    // close them all
    for (var i = 0; i < windows.length;i++)
      windows[i].close();
};

// converts a size in bytes to GB/MB/KB representation
var displaySizeToHuman = function(size) {
  if (size >= 1<<30)
    return Math.round(size / (1<<30))+"GB";
  if (size >= 1<<20)
    return Math.round(size / (1<<20))+"MB";
  if (size >= 1<<10)
    return Math.round(size / (1<<10))+"KB";
  return size+" B";
};

angular.module('flowApp')

.controller('assetSearchCtrl', ['$scope', '$http', 'es', function($scope, $http, es) {
  window.$scope = $scope // For testing
  $scope.query = ""
  $scope.searchTags = []
  $scope.$on('userLogin', function(event, args) {
    console.log("User logged in");
  });

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
    var usercode = getWindowByTitle("Flow Assets").usercode;
    var useremail = getWindowByTitle("Flow Assets").useremail;

    console.log(JSON.stringify(getWindowByTitle("Flow Assets")));
    console.log(useremail + usercode);




    // This seperates the query into tags
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
    var dataObj = { "tags" : $scope.searchTags, "code" : usercode  };
    $http.post("https://tryflow.io/api/search", dataObj).success(function(data) {
      for (var i in data.hits.hits) {
        // console.log(data.hits.hits[i]); // This shows in the console all the objects returned
        data.hits.hits[i]["_source"]["displaySize"] = displaySizeToHuman(data.hits.hits[i]["_source"]["size"]);  // This says take the size of it and convert it in ng for angular
      }
      $scope.assets = data
      window.ls.set("lastSearch", {query: $scope.query, searchTags: $scope.searchTags})
    })
  }

  $scope.deleteAssetFromDB = function(asset){
    $http.delete("https://tryflow.io/api/search/delete/" + asset._id)
  }

  $scope.deleteTag = function($index){
    $scope.searchTags.splice($index, 1)
    $scope.search()
  }



  // $scope.addTagByLink = function($index){
  //   $scope.searchTags.push($index)
  //   $scope.search()
  // }



  $scope.newViewTransition = function () {
     var assetFilter = document.querySelector('.checkbox-options-holder');
     assetFilter.classList.toggle('inactive');
     var chevronDown = document.querySelector('.fa-chevron-down');
     chevronDown.classList.toggle('rotateInMod');
  }

  $scope.downloadAssets = function() {
    var bottomCarousel = getWindowByTitle("Flow Downloads");
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
         itemsToDisplay[i]._source.imgPsd="https://s3-us-west-1.amazonaws.com/asset-raw/"+itemsToDisplay[i]._source.name+".psd";
       }
     bottomCarousel.webContents.send('ping', itemsToDisplay);

     // deselect all selection on search screen
     for (i = 0; i < itemsToDisplay.length; ++i) {
        angular.element(document.getElementById(itemsToDisplay[i]._id)).scope().assetChosen = false;
     }
     $scope.$apply();
     // hide download bar
     document.getElementById("get-assets-container").className = "";
   }





// This is for deletion of tags using keypress
// Also paginates with the return key
    // To do: Make delete keypress delete tag !!
   document.addEventListener("keypress", function(e){
     //  console.log("hi", e.keyCode)   // console.log("hi", e)
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

  // hides this window; if all windows are closed, the app exits
  $scope.closeClicked = function() {
    var mainWindow = getWindowByTitle("Flow Assets");
    mainWindow.hide();
    checkAllWindowClosed();
  }

  $scope.openDeleteModal = function() {
      if (confirm('Are you sure you want to delete this asset from the database?')) {
        // Save it!
      } else {
        // Do nothing!
      }
  }


  $scope.openTagsModal = function() {
    console.log("Hey tags")
    // document.getElementById("tag-row").className = "active";
  }


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

// .controller('userProfileCtrl', ['$scope', 'dropstoreClient', function($scope) {
//
//     console.log('controller loaded');
// }])



// BOTTOM CAROUSEL CONTROLLER   // Calls bottom carousel window, png's & psd's of selected assets.
.controller('carouselController', ['$scope','$http', function($scope,$http) {
  window.$scope = $scope
  $scope.assets = []
  var assetids = {};

  require('ipc').on('ping', function(message) {
    console.log(JSON.stringify(message));
    var os = require("os");
    for (var i in message) {
      // skip assets already selected for download
      if (assetids[message[i]["_id"]] !== undefined)
        continue;
      $scope.assets.push(message[i]);
      $scope.downloadPSD(message[i]._source.imgPsd,os.tmpdir()+'/'+ message[i]._id+'.psd', message[i]._id);
      // mark it already downloading
      assetids[message[i]["_id"]] = 1;
    }
    // load assets into scope
    $scope.$apply();

    $scope.openOutsideApplication = function(asset) {
      console.log("openOutsideApplication");

      var id = asset._id;
      var os = require("os");
      var fs = require('fs'),
      exec = require('child_process').exec;

      console.log('opening Photoshop');
      // uses the ID given above to open the photoshop file
      if (os.platform() == "win32") {
        var child = exec('start "" "'+os.tmpdir()+'/'+asset._id+'.psd"',
             function (err, stdout, stderr) {  });

      } else if (os.platform() == "darwin") {
        var child = exec('open -a "Adobe\ Photoshop\ CS6" '+os.tmpdir()+'/'+asset._id+".psd",
             function (err, stdout, stderr) { console.log('heyyyyyi'); console.log(err); console.log(stdout); console.log(stderr); });
      }
    }
  });



// Makes search window hide on Bottom Carousel Click
/*
  $scope.hideSearchWindow = function() {
    console.log("hideSearchWindow");
    var searchWindow = getWindowByTitle("Flow Assets")

    searchWindow.hide()

    setInterval(function(){
     document.querySelector('.fa-search').classList.toggle('attention');
  }, 2000);
  }
*/



  $scope.showSearchWindow = function() {
    var searchWindow = getWindowByTitle("Flow Assets");
    searchWindow.show()
    searchWindow.focus();
    // document.querySelector('.fa-search').classList.toggle('active');
  }

  // hides the carousel
  $scope.closeBottomCarousel = function() {
    var bottomCarousel = getWindowByTitle("Flow Downloads");
    bottomCarousel.hide();
    checkAllWindowClosed();
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

              // This needs to get fixed makes so background image loses blur on download.
              // document.getElementById('imgDownloaded').classList.add("downloaded");

              console.log('Loader jquery:' + document.getElementById('loader-' + imgId))
            // $scope.assets[i]._source.imgSrc,'./imgs/'+ $scope.assets[i]._id+'.png';
             });
          }
      }])


// This is for the onboarding process
.controller('placeholderCtrl', ['$scope', function($scope) {
  var tempName = ["iPhone", "iPad", "iPhone", "icons"];

  $scope.assetDemo = tempName;

  for (var i = 0; i < tempName.length; i++) {
    setInterval(function(){
        tempName[i]
    }, 1000)
  }

}])

.controller('authorCtrl', ['$scope', '$http', 'dropstoreClient', function($scope, $http, dropstoreClient) {

    // $http.get('https://www.dropbox.com/1/oauth/authorize')
    //   .success(function(data, status, headers, config) {
    //       $scope.posts = data;
    //   })
    //   .error(function(data, status, headers, config) {
    //       // log error
    //   });







// DROPBOX AUTH
// DROPBOX AUTH
// DROPBOX AUTH
          //   var crypto = require('crypto'),
          //   	express = require('express'),
          //   	request = require('request'),
          //   	url = require('url');
          //
          //   var app = express();
          //   app.use(express.cookieParser());
          //
          //   // insert your app key and secret here
          //   var APP_KEY = '<YOUR APP KEY>';
          //   var APP_SECRET = '<YOUR APP SECRET>';
          //
          //   function generateCSRFToken() {
          //   	return crypto.randomBytes(18).toString('base64')
          //   		.replace(/\//g, '-').replace(/\+/g, '_');
          //   }
          //
          //   function generateRedirectURI(req) {
          //   	return url.format({
          //   			protocol: req.protocol,
          //   			host: req.headers.host,
          //   			pathname: app.path() + '/callback'
          //   	});
          //   }
          //
          //   app.get('/', function (req, res) {
          //   	var csrfToken = generateCSRFToken();
          //   	res.cookie('csrf', csrfToken);
          //   	res.redirect(url.format({
          //   		protocol: 'https',
          //   		hostname: 'www.dropbox.com',
          //   		pathname: '1/oauth2/authorize',
          //   		query: {
          //   			client_id: APP_KEY,
          //   			response_type: 'code',
          //   			state: csrfToken,
          //   			redirect_uri: generateRedirectURI(req)
          //   		}
          //   	}));
          //   });
          //
          //   app.get('/callback', function (req, res) {
          //   	if (req.query.error) {
          //   		return res.send('ERROR ' + req.query.error + ': ' + req.query.error_description);
          //   	}
          //
          //   	// check CSRF token
          //   	if (req.query.state !== req.cookies.csrf) {
          //   		return res.status(401).send(
          //   			'CSRF token mismatch, possible cross-site request forgery attempt.'
          //   		);
          //   	}
          //   	// exchange access code for bearer token
          //   	request.post('https://api.dropbox.com/1/oauth2/token', {
          //   		form: {
          //   			code: req.query.code,
          //   			grant_type: 'authorization_code',
          //   			redirect_uri: generateRedirectURI(req)
          //   		},
          //   		auth: {
          //   			user: APP_KEY,
          //   			pass: APP_SECRET
          //   		}
          //   	}, function (error, response, body) {
          //   		var data = JSON.parse(body);
          //
          //   		if (data.error) {
          //   			return res.send('ERROR: ' + data.error);
          //   		}
          //
          //   		// extract bearer token
          //   		var token = data.access_token;
          //
          //   		// use the bearer token to make API calls
          //   		request.get('https://api.dropbox.com/1/account/info', {
          //   			headers: { Authorization: 'Bearer ' + token }
          //   		}, function (error, response, body) {
          //   			res.send('Logged in successfully as ' + JSON.parse(body).display_name + '.');
          //   		});
          //   	});
          //   });
          //
          //   app.listen(5000);
          //
          //
          //
          //
          //
          //
          //
          // // dropstoreClient.create({key: 'YOUR_APP_KEY_HERE'})
          // //     .authenticate({interactive: true})
          // //     .then(function(datastoreManager){
          // //         console.log('completed authentication');
          // //         return datastoreManager.openDefaultDatastore();
          // //     });
          //






// DOM Manipulation
  // Todo Move this

  $scope.ModalListClicked = function () {
    document.querySelector('.uploadModal').classList.toggle('active');
  }
  $scope.closeModal = function() {
    document.querySelector('.uploadModal').classList.toggle('active');
  }
  console.log('Author Controller done loadin');
}])

.controller("LoginCtrl", ['$scope', '$http', function($scope, $http) {
  $scope.authenticate = function() {
    $http.post("https://tryflow.io/api/login", {"email" : $scope.email, "code" : $scope.password }).success(function(data) {
      // success on login. Save cookie & log user in
      if (data["ok"] != "ok") {
        $scope.loginError = "Login error."
        return false;
      }
      var mainWindow = getWindowByTitle("Flow Assets");
      mainWindow.loadUrl('file://' + __dirname + '/index.html');
      mainWindow.useremail = $scope.email;
      mainWindow.usercode = $scope.password;
      // save down auth file
      var fs = require('fs');
      var os = require("os");
      fs.writeFileSync(os.homedir()+"/.flow/profile.ini", $scope.email+"\t"+$scope.password);
    }).error(function(res) {
      $scope.loginError = "Wrong email, or password."
    })

    return false;
  }

  // open default browser at tryflow.io
  $scope.requestInvite = function() {
      var os = require("os");
      var execSync = require('child_process').execSync;
      if (os.platform() == "win32") {
        var child = execSync('start "" "https://tryflow.io"');
      } else if (os.platform() == "darwin") {
        var child = execSync('open "https://tryflow.io"');
      }
      return false;
  }

  // init
  var mainWindow = getWindowByTitle("Flow Assets");
  if (mainWindow == null)
    return false;
  if (mainWindow.useremail != "")
    $scope.email = mainWindow.useremail;
  if (mainWindow.usercode != "")
    $scope.password = mainWindow.usercode;
  if (($scope.email != "") && ($scope.password != ""))
    $scope.authenticate();
}])
