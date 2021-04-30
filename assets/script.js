

navigator.geolocation.getCurrentPosition((position) => {
  //doSomething(position.coords.latitude, position.coords.longitude);//
  console.log(position)
});


function initMap() {
    const uluru = { lat: -74.0060, lng: 40.7128 }; //40.7128° N, 74.0060° W
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

var searchBtn = $('.button')//assigns function to save button
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

    userSearch[userStart, userEnd, userInterest] = text
    SetSearch();
}
GetSearch();

function SetSearch() {
  SetLocalStorage(LocalStorageKey, userSearch) 
}
function GetSearch() {
  userSearch = GetLocalStorage(LocalStorageKey) || {}
}
function SetLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
function GetLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

//==================================================================//
function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 40.7128, lng: -74.0060 }, //40.7128° N, 74.0060° W
  });
  directionsRenderer.setMap(map);
  document.getElementById("submit").addEventListener("click", () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  });
}
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const waypts = [];
  const checkboxArray = document.getElementById("waypoints");
  for (let i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected) {
      waypts.push({
        location: checkboxArray[i].value,
        stopover: true,
      });
    }
  }
  directionsService.route(
    {
      origin: document.getElementById("start").value,
      destination: document.getElementById("end").value,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK" && response) {
        directionsRenderer.setDirections(response);
        const route = response.routes[0];
        const summaryPanel = document.getElementById("directions-panel");
        summaryPanel.innerHTML = "";
        // For each route, display summary information.
        for (let i = 0; i < route.legs.length; i++) {
          const routeSegment = i + 1;
          summaryPanel.innerHTML +=
            "<b>Route Segment: " + routeSegment + "</b><br>";
          summaryPanel.innerHTML += route.legs[i].start_address + " to ";
          summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
          summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
        }
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}



