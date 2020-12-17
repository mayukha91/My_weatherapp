let date = new Date();
let currentTime = document.querySelector("p");
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = date.getMonth();

let today = date.getDate();
let hour = date.getHours();
let min = date.getMinutes();
currentTime.innerHTML =
  months[month] + " " + today + " &nbsp &nbsp" + hour + ":" + min;

let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");
let cen = document.querySelector("#cen");
let fah = document.querySelector("#fah");
function show(event) {
  event.preventDefault();
  let enteredCity = document.querySelector("input");
  let city = enteredCity.value;

  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=81a39b8b4f83887f2094935f304faa2f&units=metric";
  function showTemperature(response) {
    console.log(response.data.main.temp);
    let currentTemp = Math.round(response.data.main.temp);
    h2.innerHTML = city;

    h1.innerHTML = currentTemp;

    function replaceWithC() {
      h1.innerHTML = currentTemp;
    }
    cen.addEventListener("click", replaceWithC);

    function replaceWithF() {
      let fTemp = currentTemp * (9 / 5) + 32;
      h1.innerHTML = Math.round(fTemp);
    }
    fah.addEventListener("click", replaceWithF);
  }

  axios.get(url).then(showTemperature);
}
let button = document.querySelector(".search");
button.addEventListener("click", show);

let place = document.querySelector(".loc");

function currentLocation() {
  function showPosition(position) {
    let lati = position.coords.latitude;
    let longi = position.coords.longitude;
    let url =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lati +
      "&lon=" +
      longi +
      "&appid=f89f61a51bc4807d3dd00d252a18cc71&units=metric";

    axios.get(url).then(function showTemperature(response) {
      console.log(response.data.main.temp);
      let currentTemp = Math.round(response.data.main.temp);
      let currentCity = response.data.name;
      h2.innerHTML = currentCity;
      h1.innerHTML = currentTemp;
      function replaceWithC() {
        h1.innerHTML = currentTemp;
      }
      cen.addEventListener("click", replaceWithC);

      function replaceWithF() {
        let fTemp = currentTemp * (9 / 5) + 32;
        h1.innerHTML = Math.round(fTemp);
      }
      fah.addEventListener("click", replaceWithF);
    });
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}
place.addEventListener("click", currentLocation);
