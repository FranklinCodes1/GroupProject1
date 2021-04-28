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

  //=======================
var LocalStorageKey = "userSearch"
var userSearch = {}; //search object to be saved in local storage

var searchBtn = $('.button')//assigns function to save button
searchBtn.click(conductSearch)

function conductSearch(event) {
 event.preventDefault();
    //create
 var userStart = document.getElementById("startPoint");
 var userEnd = document.getElementById("endPoint");
 var userInterest = document.getElementById("interestPoint");

  if (userStart !== null) {
    console.log("This my start point")
  }  if (userEnd !== null) {
      console.log("This my end point")
  }    if (userInterest !== null) {
      console.log("I choose Dunkin!")      
  }
console.log("This shit here works!")
}
