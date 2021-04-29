function initMap() {
    const uluru = { lat: -25.344, lng: 131.036 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }

//=======================FORM INPUTS AND BUTTON=====================//

var LocalStorageKey = "userSearch"
var userSearch = {}; //search object to be saved in local storage

var searchBtn = $('.button')//assigns function to search button
searchBtn.click(conductSearch)

function conductSearch(event) {
 event.preventDefault();
    //create
 var userStart = document.getElementById("startPoint").value;
 var userEnd = document.getElementById("endPoint").value;
 var userInterest = document.getElementById("interestPoint").value;

  if (!userStart) {
    console.log("This was left blank")
  }  else
    console.log("Start Point: " + userStart)
  
  if (!userEnd) {
      console.log("This was left blank")
  }  else
    console.log("End Point: " + userEnd)

  if (!userInterest) {
    console.log("This was left blank")
  }  else
    console.log("Interest Point: " + userInterest)      
  
    console.log("This shit here works!")

    // userSearch[userStart, userEnd, userInterest] = value
    // SetSearch();
    calcRoute()
} 
// GetSearch();

// function SetSearch() {
//   SetLocalStorage(LocalStorageKey, userSearch) 
// }
// function GetSearch() {
//   userSearch = GetLocalStorage(LocalStorageKey) || {}
// }
// function SetLocalStorage(key, value) {
//   localStorage.setItem(key, JSON.stringify(value))
// }
// function GetLocalStorage(key) {
//   return JSON.parse(localStorage.getItem(key))
// }

//==================================================================//

//======================Map Functions
var baseUrl = "https://maps.googleapis.com"
var endUrl = "/maps/api/directions/json"
var parameters = "origin=Disneyland&destination=Universal+Studios+Hollywood&key="
var key = "AIzaSyCDmE31Xm056eYXMjfcQxw16Ucb9aH4KZk"
var requestUrl = baseUrl + endUrl + parameters + key

// function getApi() {
//   fetch(requestUrl, {mode: 'no-cors'})
//   .then(function(response) {
//     console.log(response)
//     return response.json();
//   })
//   .then(function(data) {
//     console.log(data)
//   })
// } 
// getApi()

// function initMap() {
//   const directionsService = new google.maps.DirectionsService();
//   const directionsRenderer = new google.maps.DirectionsRenderer();
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 6,
//     center: { lat: 41.85, lng: -87.65 },
//   });
//   directionsRenderer.setMap(map);
//   document.getElementById("submit").addEventListener("click", () => {
//     calculateAndDisplayRoute(directionsService, directionsRenderer);
//   });
// }

var map;
var directionsRenderer;
var directionsService;
var stepDisplay;
var markerArray = [];

function initMap() {
  // Instantiate a directions service.
  directionsService = new google.maps.DirectionsService();

  // Create a map and center it on Manhattan.
  var manhattan = new google.maps.LatLng(40.7711329, -73.9741874);
  var mapOptions = {
    zoom: 13,
    center: manhattan
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Create a renderer for directions and bind it to the map.
  var rendererOptions = {
    map: map
  }
  directionsRenderer = new google.maps.DirectionsRenderer(rendererOptions)

  // Instantiate an info window to hold step text.
  stepDisplay = new google.maps.InfoWindow();
}

function calcRoute() {

  // First, clear out any existing markerArray
  // from previous calculations.
  for (i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Retrieve the start and end locations and create
  // a DirectionsRequest using WALKING directions.
  // var start = document.getElementById('startPoint').value;
  var start = "625 8th Avenue New York NY 10018";
  console.log(start)
  // var end = document.getElementById('endPoint').value;
  var end = "260 Broadway New York NY 10007";
  console.log(end)
  var request = {
      origin: start,
      destination: end,
      travelMode: 'WALKING'
  };

  // Route the directions and pass the response to a
  // function to create markers for each step.
  directionsService.route(request, function(response, status) {
    console.log(response.routes[0].legs[0].start_location.lat())
    if (status == "OK") {
      // var warnings = document.getElementById("warnings_panel");
      // warnings.innerHTML = "" + response.routes[0].warnings + "";
      directionsRenderer.setDirections(response);
      showSteps(response);
    }
  });

}
function showSteps(directionResult) {
  // For each step, place a marker, and add the text to the marker's
  // info window. Also attach the marker to an array so we
  // can keep track of it and remove it when calculating new
  // routes.
  var myRoute = directionResult.routes[0].legs[0];

  for (var i = 0; i < myRoute.steps.length; i++) {
      var marker = new google.maps.Marker({
        position: myRoute.steps[i].start_point,
        map: map
      });
      attachInstructionText(marker, myRoute.steps[i].instructions);
      markerArray[i] = marker;
  }
}

function attachInstructionText(marker, text) {
  google.maps.event.addListener(marker, 'click', function() {
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}