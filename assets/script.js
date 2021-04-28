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
var searchBtn = $('.button')
searchBtn.click(conductSearch)



function conductSearch(event) {
 event.preventDefault();
    //create
 var userStart = document.getElementById("startPoint")
 var userEnd = document.getElementById("endPoint")
 var userInterest = document.getElementById("interestPoint")

    //build

console.log("This shit here works!")
}
